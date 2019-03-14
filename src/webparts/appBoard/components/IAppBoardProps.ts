import { IAppBoardWebPartProps } from '../IAppBoardWebPartProps';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IAppBoardProps extends IAppBoardWebPartProps {
  description: string;
  isWorkbench: boolean;
  context: WebPartContext;
}

// string of ID's used to query Azure DevOps work items.
export interface WID {
  id?: string | number;
}

export interface BoardData {
  lanes: LaneData[];
}

export interface LaneData {
  id: string;
  title: string;
  label?: string;
  cards?: CardData[];
}

export interface CardData {
  id: string | number;
  title?: string;
  description?: string;
  workItemType?: string;
  state?: string;
  startdate?: Date;
  targetdate?: Date;
  relations?: any;
  // area?: string;
  video?: string;
}