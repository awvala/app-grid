import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'AppBoardWebPartStrings';
import AppBoard from './components/AppBoard';
import { IAppBoardProps } from './components/IAppBoardProps';
import { IAppBoardWebPartProps } from "./IAppBoardWebPartProps";
import { Environment, EnvironmentType } from '@microsoft/sp-core-library';

export interface IAppBoardWebPartProps {
  description: string;
}

export default class AppBoardWebPart extends BaseClientSideWebPart<IAppBoardWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IAppBoardProps > = React.createElement(
      AppBoard,
      {
        isWorkbench: Environment.type == EnvironmentType.Local,
        description: this.properties.description,
        context: this.context,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
