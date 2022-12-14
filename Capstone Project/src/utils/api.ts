export const API_CALL = {
  // user
  API_SIGN_IN: '/api/v1/auth/signin',
  API_SIGN_UP: '/api/v1/auth/signup',
  API_SIGN_UP_BY_GOOGLE: '/api/v1/auth/signup-by-email',
  API_SIGN_IN_BY_GOOGLE: '/api/v1/auth/signin-by-email',
  API_GET_USER_INFOR: '/api/v1/user/detail',
  API_VERIFY_ACCOUNT: '/api/v1/auth/verify',
  API_CHANGE_PASSWORD: '/api/v1/auth/change-password',
  API_FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
  API_GET_POSTING: '/api/posting',
  API_RESEND_EMAIL_VERIFY: '/api/v1/auth/send-mail-verify',
  API_UPLOAD_IMAGE_ACCOUNT: '/api/v1/user/update-image',
  API_FAVOURITE: '/api/favorite',
  API_GET_POST_TOP_8: '/api/posting/top-8',
  API_REPORT: '/api/report',
  API_FEEDBACK: '/api/feedback',
  API_FEEDBACK_ADMIN: '/api/feedbackLandlord',
  API_SEARCH_HOUSE_NAME: '/api/posting/house-name',
  API_POSTING_FOR_MAP: '/api/posting-map',
  API_FILTER: '/api/room/filter',
  API_FILTER_MAP: '/api/room/filter-map',

  // admin
  API_TYPE_OF_RENTAL: '/api/typeOfRental',
  API_ROOM_CATEGORY: '/api/roomCategory',
  API_ROOM_TYPE: '/api/roomType',
  API_AMENITY: '/api/amenity',
  API_ROOM_AMENITIES: '/api/roomAmenities',
  API_ACCOUNT: '/api/v1/user',
  API_BANK_ACCOUNT: '/api/v1/bank-account',
  API_POSTING_COST: '/api/post-type',
  API_TRANSACTION: '/api/transaction',
  API_TRANSACTION_USER: '/api/transaction/user',
  API_POSTING_CONFIRM: '/api/post/confirm',
  API_POSTING_REJECT: '/api/post/reject',
  API_POSTING_DELETE: '/api/post/delete',
  API_TRANSACTION_SEARCH: '/api/transaction/search',
  API_TRANSACTION_CREATE_BY_ADMIN: '/api/transaction-by-admin',
  API_TRANSACTION_POST_OR_EXTEND_SEARCH: '/api/transaction/search/post-or-extend',
  API_ADMIN_DASHBOARD: '/api/dash-board/admin',
  API_CANCEL_VERIFY_POST: '/api/post/verify/fail',
  API_VERIFY_USER: '/api/v1/auth/verify/user',
  API_ADMIN_DASHBOARD_DATA: '/api/dash-board/admin/data',
  API_ADMIN_POST_RESTORE: '/api/post/restore',
  API_ADMIN_POST_VERIFY_AGAIN: '/api/post/verify-again',
  API_ADMIN_POST_SEARCH: '/api/post/search',

  // host
  API_CREATE_HOUSE: '/api/house/create',
  API_GET_HOUSE: '/api/house',
  API_ROOM: '/api/room',
  API_EXTEND_POST: '/api/post-extend',
  API_DEPOSIT: '/api/transaction/deposit',
  API_TRANSACTION_CONFIRM: '/api/transaction/confirm',
  API_TRANSACTION_REJECT: '/api/transaction/reject',
  API_CHECK_ROOM_UNIQUE: '/api/room/check-room-name',
  API_GET_HISTORY_HOUSE: '/api/house/history',
  API_HOST_DASHBOARD: '/api/dash-board/host',
  API_HOST_DASHBOARD_DATA: '/api/dash-board/host/data',
  API_HOST_DELETE_HOUSE: '/api/house/delete-by-list',
  API_HOST_DELETE_ROOM: '/api/room/delete-by-list',
  API_HOST_SEARCH_TRANSACTION: '/api/transaction/search/v2',

  // common
  API_GET_CITY: '/api/thanhpho',
  API_GET_DISTRICT: '/api/quanhuyen/thanhpho',
  API_GET_VILLAGE: '/api/phuongxa/quanhuyen',
  API_POST: '/api/post',
  API_POSTING: '/api/posting',
  API_POST_BY_TOKEN: '/api/post-by-token',
  API_POST_TYPE: '/api/post-type',
  API_POST_VERIFY: '/api/post/verify',
  API_MAP_POSITON: '/api/map-position',

  // user
  API_GET_USER_INFORMATION: '/api/v1/user',
  API_UPDATE_USER_INFORMATION: '/api/v1/user',
  API_UPDATE_ROLE_TO_HOST: '/api/v1/user/update-role',
};
