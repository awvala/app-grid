import * as React from 'react';
import styles from './AppBoard.module.scss';
import { IAppBoardProps, WID, BoardData } from './IAppBoardProps';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/components/Spinner';
import { Placeholder } from '@pnp/spfx-controls-react/lib/Placeholder';
import { escape } from '@microsoft/sp-lodash-subset';
import { autobind } from 'office-ui-fabric-react';
import { AadHttpClient, HttpClientResponse } from '@microsoft/sp-http';
import { HorizontalTabs } from './HorizontalTabs';

/*
  * Resets the application theme
*/
import { loadTheme } from 'office-ui-fabric-react';

loadTheme({
  palette: {
    themePrimary: '#1e9d8b',
    themeLighterAlt: '#f3fbfa',
    themeLighter: '#d0efeb',
    themeLight: '#abe2da',
    themeTertiary: '#65c5b7',
    themeSecondary: '#31aa98',
    themeDarkAlt: '#1b8e7d',
    themeDark: '#17786a',
    themeDarker: '#11594e',
    neutralLighterAlt: '#f8f8f8',
    neutralLighter: '#f4f4f4',
    neutralLight: '#eaeaea',
    neutralQuaternaryAlt: '#dadada',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c8c8',
    neutralTertiary: '#c2c2c2',
    neutralSecondary: '#858585',
    neutralPrimaryAlt: '#4b4b4b',
    neutralPrimary: '#333333',
    neutralDark: '#272727',
    black: '#1d1d1d',
    white: '#ffffff',
  }
});

export interface IAppBoardState {
  loading?: boolean;
  showPlaceholder?: boolean;
  data: {};
}

export default class AppBoard extends React.Component<IAppBoardProps, IAppBoardState> {

  constructor(props: IAppBoardProps, state: IAppBoardState) {
    super(props);

    this._onConfigure = this._onConfigure.bind(this);

    // Initialize the state of the component
    this.state = {
      loading: true,
      showPlaceholder: false,
      data:
      {
        lanes: [
          {
            id: 'Loading...',
            title: 'Loading...',
            cards: [],
          }
        ]
      }
    };
  }

  /*
   * Opens the web part property pane
  */
  private _onConfigure() {
    this.props.context.propertyPane.open();
  }

  public render(): React.ReactElement<IAppBoardProps> {

    // Check if placeholder needs to be shown
    if (this.state.showPlaceholder) {
      return (
        <Placeholder
          iconName="Edit"
          iconText="Kanban board web part configuration"
          description="Please configure the web part to show the kanban board."
          buttonLabel="Configure"
          onConfigure={this._onConfigure}
        />
      );
    } else {
      return (
        <div className={styles.appBoard}>
          {this.state.loading ?
            (
              <Spinner size={SpinnerSize.large} label="Retrieving results ..." />
            ) : this.state.data === undefined ?
              (
                <Placeholder
                  iconName="InfoSolid"
                  iconText="No items found"
                  description="Please select a new list or update the filter in the property pane."
                  buttonLabel="Configure"
                  onConfigure={this._onConfigure}
                />
              ) :
              <div className={styles.container}>
                <h2>{escape(this.props.description)}</h2>
                <div className= {styles.pivotContainer}>
                  <HorizontalTabs
                    workitemsData = {this.state.data}
                  />
                </div>
              </div>
          }
        </div>
      );
    }
  }

  public componentDidMount(): void {
    this.loadData();
  }

  public componentDidUpdate() {
    if (this.state.loading) {
      this.loadData();
    }
  }

  @autobind
  private loadData(): void {
    if (this.props.isWorkbench) {
      // get mock data in Workbench
      this.setState({
        data: {
          lanes: [
            {
              id: 'New',
              title: 'New',
              // label: '2/2',
              cards: [
                { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', area: 'Inventory' },
                { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', area: 'PPM' }
              ]
            },
            {
              id: 'Active',
              title: 'Active',
              // label: '0/0',
              cards: [
                { id: 'Card1', title: 'Review movies', description: 'Can AI review cinematography?', label: '20 mins', area: 'Quality' },
                { id: 'Card2', title: 'Go out to dinner', description: 'Can I turn my OS into Friday?', label: '5 mins', area: 'Shipment' }
              ]
            }
          ]
        },
        loading: false,
      });
      // console.log(this.state.data);
    } else {
      // Get WorkItem ID's from first DevOps API call
      this.props.context.aadHttpClientFactory
        .getClient('499b84ac-1321-427f-aa17-267ca6975798')
        .then((client: AadHttpClient): void => {
          client
            .get('https://dev.azure.com/AndrewVala/Andrew_Vala/_apis/wit/wiql/2153e285-b146-4322-aaaa-95df5dd01c96?api-version=5.0', AadHttpClient.configurations.v1)
            .then((response: HttpClientResponse) => {
              return response.json();
            })
            // Convert json results into array of ID's for second API call to DevOps project.
            .then((response) => {
              const wIDS = new Array;
              const lists: WID[] = response.workItems;
              lists.forEach((list: WID) => {
                wIDS.push(list.id);
              });
              return wIDS;
            })
            // Make second API call with all relevant ID's and expand fields and relationship json results
            .then((wIDs) => {
              client
                .get(`https://dev.azure.com/AndrewVala/_apis/wit/workitems?ids=${wIDs}&$expand=relations&api-version=5.0`, AadHttpClient.configurations.v1)
                .then((response: HttpClientResponse) => {
                  return response.json();
                })
                .then(json => {
                  // console.log(json);
                  // Convert API results into data structure we can use build Pivot navigation element in Horizontal Tabs component
                  this.buildLanes(json)
                    .then((boardData) => {
                      const workItemsList = boardData;

                      // Conditionally add each workitem to the correct Lane array based on its State value and get the index of that State array object.
                      json.value.map((items: any) => {
                        const tempState = items.fields["System.State"];
                        const laneIndex = workItemsList.lanes.findIndex((item) => item.title === tempState);

                        workItemsList.lanes[laneIndex].cards.push({
                          id: items.id,
                          title: items.fields["System.Title"],
                          description: items.fields["System.Description"],
                          workItemType: items.fields["System.WorkItemType"],
                          state: items.fields["System.State"],
                          startdate: items.fields["Microsoft.VSTS.Scheduling.StartDate"],
                          targetdate: items.fields["Microsoft.VSTS.Scheduling.TargetDate"],
                          relations: items.relations,
                          // area: items.fields["Custom.Area"]
                          video: items.fields["Custom.VideoLink"]
                        });
                      });
                      this.setState({
                        data: workItemsList,
                        loading: false,
                      });
                       console.log(this.state.data);
                    });
                });
            });
        });
    }
  }

  // Get unique State values from API results to construct Lanes and place them in the BoardData structure.
  protected buildLanes = async (json): Promise<BoardData> => {
    const boardData = { lanes: [], };
    const uniqueStates = Array.from(new Set(json.value.map(item => item.fields["System.State"])));

    uniqueStates.map((items: any) => { boardData.lanes.push({ id: items,title: items,cards: [],});});
    // console.log(boardData);
    return boardData;
  }

}
