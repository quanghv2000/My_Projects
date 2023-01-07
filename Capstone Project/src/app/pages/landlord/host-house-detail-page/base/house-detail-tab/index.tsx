import { Button, PageHeader, Spin, Tabs, Form } from 'antd';
import { HouseDetailInfoTab } from 'app/pages/landlord/host-house-detail-page/base/house-detail-info-tab';
// import { HouseDetailPostTab } from 'app/pages/landlord/host-house-detail-page/base/house-detail-post-tab';
import { HouseDetailHistoryTab } from 'app/pages/landlord/host-house-detail-page/base/house-detail-history-tab';
import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from 'types/RootState';
import { DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY } from 'utils/config';
import { hostHouseUpdateRequest } from 'app/pages/landlord/host-house-detail-page/screen/action';
import { useDispatch } from 'react-redux';
const { TabPane } = Tabs;

export const HouseDetailTab: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const userInfoCookies = localStorage.getItem('user-info');
  // const userInfoCookies = getCookie('user-info');
  let userInfo: any;

  if (userInfoCookies) {
    userInfo = JSON.parse(userInfoCookies);
  }
  const state = useSelector(
    (state: RootState) => state?.houseDetailPageReducer
  );

  const [valueAmenitiesCheckbox, setValueAmenitiesCheckbox]: any = useState([]);
  const [keyTab, setKeyTab]: any = useState();
  const [fileList, setFileList]: any = useState([]);

  const [form] = Form.useForm();

  const history = useHistory();
  const callback = (key) => {
    setKeyTab(key);
  };

  useEffect(() => {
    setKeyTab('1');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitData = (values: any, data: any) => {
    let dataAmenity: any = [];
    // eslint-disable-next-line array-callback-return
    valueAmenitiesCheckbox?.map((item: any) => {
      dataAmenity.push({ id: item });
    });
    const body = {
      id: state?.dataResponse?.id,
      name: form.getFieldValue('name'),
      user: {
        id: userInfo?.id,
      },
      phoneNumber: form.getFieldValue('phoneNumber'),
      area: form.getFieldValue('area'),
      description: form.getFieldValue('description'),
      houseDirection: form.getFieldValue('houseDirection'),
      linkFb: form.getFieldValue('linkFb'),
      address: {
        id: state?.dataResponse?.address?.id,
        street: form.getFieldValue('address'),
        longiude: form.getFieldValue('longiude')
          ? parseFloat(form.getFieldValue('longiude'))
          : null,
        latitude: form.getFieldValue('latitude')
          ? parseFloat(form.getFieldValue('latitude'))
          : null,
        phuongXa:
          typeof values?.address !== 'string'
            ? {
                id: form.getFieldValue('phuongxa'),
              }
            : {
                id: state?.dataResponse?.address?.phuongXa?.id,
              },
      },
      typeOfRental:
        typeof values?.typeOfRental !== 'string'
          ? {
              id: form.getFieldValue('typeOfRental'),
            }
          : {
              id: state?.dataResponse?.typeOfRental?.id,
            },
      amenities: dataAmenity,
      imageUrl:
        data !== ''
          ? JSON.parse(data)?.url
            ? JSON.parse(data)?.url
            : ''
          : state?.dataResponse?.imageUrl,
    };
    dispatch(hostHouseUpdateRequest(body));
  };

  const onFinish = (values: any) => {
    const url = DEFAULT_APP_SECOND_UPLOAD_CLOUNDINARY;
    const formData = new FormData();

    if (fileList.length > 0 && fileList[0]?.status !== 'done') {
      for (let i = 0; i < fileList.length; i++) {
        let file = fileList[i];
        formData.append('file', file?.originFileObj);
        formData.append('upload_preset', 'ml_default');
        fetch(url, {
          method: 'POST',
          body: formData,
        })
          .then((response) => {
            return response.text();
          })
          .then((data) => {
            submitData(values, data);
          });
      }
    } else {
      submitData(values, '');
    }
  };
  const onFinishFailed = () => {};

  return (
    <Fragment>
      <Spin spinning={state?.loading} delay={100}>
        <Form
          name="basic"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          style={{
            width: ' 100%',
            padding: '20px 20px',
            // display: 'flex',
            // justifyContent: 'center',
          }}
        >
          <PageHeader
            key="house-detail"
            className="site-page-header mb-20"
            onBack={() => history.push('/host/house')}
            title="Xem thông tin chi tiết nhà"
            extra={[
              <Button
                className="ml-20"
                style={{
                  backgroundColor: '#fa8c16',
                  borderColor: '#fa8c16',
                  color: 'white',
                }}
                onClick={() => history.push('/host/house')}
              >
                <i className="fa-solid fa-rotate-left mr-5"></i> Quay về
              </Button>,

              keyTab === '1' ? (
                <Button
                  type="primary"
                  style={{
                    color: 'white',
                  }}
                  htmlType="submit"
                >
                  Lưu
                </Button>
              ) : (
                ''
              ),
            ]}
          />
          <Tabs onChange={callback} type="card">
            <TabPane tab="Thông tin căn nhà" key="1">
              <HouseDetailInfoTab
                form={form}
                valueAmenitiesCheckbox={valueAmenitiesCheckbox}
                setValueAmenitiesCheckbox={setValueAmenitiesCheckbox}
                fileList={fileList}
                setFileList={setFileList}
              />
            </TabPane>
            {/* <TabPane tab="Dịch vụ đăng tin" key="2">
              <HouseDetailPostTab />
            </TabPane> */}
            {/* <TabPane tab="Lịch sử" key="3">
              <HouseDetailHistoryTab id={props?.id} />
            </TabPane> */}
          </Tabs>
        </Form>
      </Spin>
    </Fragment>
  );
};
