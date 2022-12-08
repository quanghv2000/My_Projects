import { FunctionComponent } from "react";

export type IRoute = {
    path: string;
    page: FunctionComponent<any>;
    layout: FunctionComponent<any>;
};