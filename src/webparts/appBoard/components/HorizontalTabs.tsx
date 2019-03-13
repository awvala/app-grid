import * as React from 'react';
import styles from './AppBoard.module.scss';
import { PivotLinkSize, PivotLinkFormat, PivotItem, Pivot } from 'office-ui-fabric-react/lib/Pivot';

import { CardContainer } from './Cards/CardContainer';
import { BacklogItem } from './Cards/BacklogItem';
import { InProcessItem } from './Cards/InProcessItem';
import { CompleteItem } from './Cards/CompleteItem';

export const HorizontalTabs = props => {

    let NewIndex: number = props.workitemsData.lanes.findIndex((item) => item.title === "New");
    let ActiveIndex: number = props.workitemsData.lanes.findIndex((item) => item.title === "Active");
    let ClosedIndex: number = props.workitemsData.lanes.findIndex((item) => item.title === "Closed");

    return (
        
        <div>
            <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.large} defaultSelectedKey="In-Progress">
                <PivotItem itemIcon="Backlog" headerText="Backlog" itemKey="Backlog">
                    <CardContainer>
                        {props.workitemsData.lanes[NewIndex].cards.map((card) =>
                            <BacklogItem
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                area={card.area}
                                state={card.state}
                                workItemType={card.workItemType}
                                startdate={card.startdate}
                                targetdate={card.targetdate}
                                relations={card.relations}
                            />
                        )}
                    </CardContainer>
                </PivotItem>
                <PivotItem itemIcon="DeveloperTools" headerText="In-Progress" itemKey="In-Progress">
                    <CardContainer>
                        {props.workitemsData.lanes[ActiveIndex].cards.map((card) =>
                            <InProcessItem
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                area={card.area}
                                state={card.state}
                                workItemType={card.workItemType}
                                startdate={card.startdate}
                                targetdate={card.targetdate}
                                relations={card.relations}
                            />
                        )}
                    </CardContainer>
                </PivotItem>
                <PivotItem itemIcon="Completed" headerText="Complete" itemKey="Complete">
                    <CardContainer>
                        {props.workitemsData.lanes[ClosedIndex].cards.map((card) =>
                            <CompleteItem
                                id={card.id}
                                title={card.title}
                                description={card.description}
                                area={card.area}
                                state={card.state}
                                workItemType={card.workItemType}
                                startdate={card.startdate}
                                targetdate={card.targetdate}
                                relations={card.relations}
                            />
                        )}
                    </CardContainer>
                </PivotItem>
            </Pivot>
        </div>
    );
};
