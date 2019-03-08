import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IAppBoardWebPartProps {
    description: string; // Stores the Web Part Title
    context: WebPartContext;
}