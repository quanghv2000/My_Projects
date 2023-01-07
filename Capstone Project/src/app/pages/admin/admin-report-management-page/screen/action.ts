
import { createAction } from '@reduxjs/toolkit';
import { adminReportPageEnum } from 'app/pages/admin/admin-report-management-page/screen/type';
import { actionPayload } from 'helper/index';


// report post
export const getReportPostRequest = createAction<any>(
    adminReportPageEnum.GET_REPORT_POST_REQUEST
);
export const getReportPostSuccess = createAction(
    adminReportPageEnum.GET_REPORT_POST_SUCCESS,
    (payload: Record<string, any>[]) => actionPayload(payload)
);
export const getReportPostFailure = createAction(
    adminReportPageEnum.GET_REPORT_POST_FAILURE,
    (payload: string, query: string) => actionPayload(payload, { query })
);
