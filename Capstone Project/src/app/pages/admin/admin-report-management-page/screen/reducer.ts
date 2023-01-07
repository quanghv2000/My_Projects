import { createReducer } from '@reduxjs/toolkit';
import { adminReportPageEnum } from 'app/pages/admin/admin-report-management-page/screen/type';


// The initial state of the App
export const initialState = {
    loading: false,
    error: false,
    dataResponse: [],
    status: ""
};

export const adminReportReducer = createReducer(initialState, (builder) => {
    builder
        // get detail room
        .addCase(adminReportPageEnum.GET_REPORT_POST_REQUEST, (state, action) => {
            state.dataResponse = [];
            state.loading = true;
            return state;
        })
        .addCase(adminReportPageEnum.GET_REPORT_POST_SUCCESS, (state, action: any) => {
            state.loading = false;
            state.dataResponse = action?.payload?.results
            return state;
        })
        .addCase(adminReportPageEnum.GET_REPORT_POST_FAILURE, (state, action: any) => {
            state.loading = false;
            return state;
        })

});
