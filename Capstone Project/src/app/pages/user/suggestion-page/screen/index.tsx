import { Button, Drawer, Row, Space, Col } from 'antd';
import { NavBar } from 'app/components/navbar-search-page';
import AccommodationFilterLeft from 'app/pages/user/suggestion-page/base/filters-left';
import { SuggesstionLists } from 'app/pages/user/suggestion-page/base/ListsSuggesstion';
import { SuggesstionMap } from 'app/pages/user/suggestion-page/base/MapSuggesstion';
import { ScrollToTop } from 'hooks/scroll-to-top';
import { FilterBar } from 'app/pages/user/suggestion-page/base/filter-bar';
import { Footer } from 'app/components/footer';
import { Fragment, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { filterPostingRequest } from 'app/pages/user/suggestion-page/screen/action';
import { getDataRoomCategoriesRequest } from 'app/pages/admin/admin-room-category-management-page/screen/action';
import { getDataAmenityRequest } from 'app/pages/admin/admin-amenity-management-page/screen/action';
import { getDataTypeOfRentalRequest } from 'app/pages/admin/admin-type-of-rental-management-page/screen/action';
import { getQueryVariable } from 'helper';
import 'react-loading-skeleton/dist/skeleton.css';
import './style.scss';

export interface SuggesstionPageProps {}

export const SuggestionPage = (props: any) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(250);

  const [isApplyFilter, setApplyFilter] = useState(false);

  const [filter, setFilter]: any = useState({
    pageIndex: 1,
    pageSize: 15,
    verify: '',
    minArea: null,
    maxArea: null,
    typeOfRentalIds: null,
    roomCategoryIds: null,
    minPrice: null,
    maxPrice: null,
    maximumNumberOfPeople: null,
    amenityHouseIds: null,
    amenityRoomIds: null,
    roomMate: '',
    houseName: '',
  });

  const controlNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > 50) {
        // if scroll up show the navbar
        setShow(true);
      } else {
        // if scroll down hide the navbar
        setShow(false);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      setFilter({
        pageIndex: 1,
        pageSize: 15,
        verify: '',
        minArea: null,
        maxArea: null,
        typeOfRentalIds: null,
        roomCategoryIds: null,
        minPrice: null,
        maxPrice: null,
        maximumNumberOfPeople: null,
        amenityHouseIds: null,
        amenityRoomIds: null,
        roomMate: '',
        houseName: '',
      });
    };
  }, []);

  useEffect(() => {
    const newData: any = [];
    if (getQueryVariable('roomType')) {
      newData.push(getQueryVariable('roomType'));
      setFilter({
        ...filter,
        roomCategoryIds: newData,
      });
      setApplyFilter(true);
    }
  }, [getQueryVariable('roomType')]);

  useEffect(() => {
    if (getQueryVariable('type') === 'map') {
      setViewMap({
        isMap: true,
        title: 'Lưới',
      });
    } else {
      setViewMap({
        isMap: false,
        title: 'Bản Đồ',
      });
    }
  }, [getQueryVariable('type')]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataRoomCategoriesRequest(''));
    dispatch(getDataAmenityRequest(''));
    dispatch(getDataTypeOfRentalRequest(''));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [visible, setVisible] = useState(false);
  const [viewMap, setViewMap] = useState({
    isMap: false,
    title: 'Lưới',
  });

  const onClose = () => {
    setVisible(false);
  };

  const onClickOpenModalFilters = () => {
    setVisible(true);
  };

  const onClickSetViewMap = () => {
    if (viewMap.isMap) {
      setViewMap({
        isMap: false,
        title: 'Bản Đồ',
      });
    } else {
      setViewMap({
        isMap: true,
        title: 'Lưới',
      });
    }
    window.scrollTo(0, 0);
  };

  return (
    <Fragment>
      <Helmet>
        <title>Tìm kiếm</title>
        <meta name="description" content="Wish list page" />
      </Helmet>
      <ScrollToTop />

      {/* Header */}
      <NavBar navbarfixed={true} />
      <Row>
        <Col span={24}>
          <FilterBar
            setFilter={setFilter}
            setApplyFilter={setApplyFilter}
            isApplyFilter={isApplyFilter}
            filter={filter}
            show={viewMap.isMap ? false : show}
            viewMap={viewMap.isMap ? 'map' : ''}
            title={viewMap.title}
            onClickOpenModalFilters={onClickOpenModalFilters}
            onClickSetViewMap={onClickSetViewMap}
            navbarfixed={true}
          />
        </Col>

        {/* <Col span={4}>
          <Row className="suggestion-container__filters__filter">
            <Button
              size="large"
              className="custom-button"
              type="default"
              onClick={onClickOpenModalFilters}
            >
              Bộ lọc
            </Button>
            <Button
              size="large"
              className="custom-button"
              type="default"
              onClick={onClickSetViewMap}
            >
              {viewMap.title}
            </Button>
          </Row>
        </Col> */}
      </Row>

      {/* <Row className="suggestion-container" style={{ paddingTop: 100 }}> */}
      {/* <Row className="suggestion-container__filters">
          <Row className="suggestion-container__filters__location">
            <Menu mode="horizontal" defaultSelectedKeys={['mail']}>
              <Tabs defaultActiveKey="1" onChange={onChange} size="large">
                {locationFakeData.map((item) => {
                  return <TabPane tab={item.location} key={item.id}></TabPane>;
                })}
              </Tabs>
            </Menu>
          </Row>
          <Row className="suggestion-container__filters__filter">
            <Button
              size="large"
              className="custom-button"
              type="default"
              onClick={onClickOpenModalFilters}
            >
              Bộ lọc
            </Button>
            <Button
              size="large"
              className="custom-button"
              type="default"
              onClick={onClickSetViewMap}
            >
              {viewMap.title}
            </Button>
          </Row>
        </Row> */}
      {viewMap.isMap ? (
        <SuggesstionMap
          setApplyFilter={setApplyFilter}
          setViewMap={setViewMap}
          setFilter={setFilter}
        />
      ) : (
        <div
          className="suggestion__lists__items--container"
          style={{
            height: '100%',
            minHeight: 200,
          }}
        >
          <SuggesstionLists
            setFilter={setFilter}
            setApplyFilter={setApplyFilter}
            isApplyFilter={isApplyFilter}
            filter={filter}
            setViewMap={setViewMap}
            listsfour={true}
          />
        </div>
      )}

      {/* {viewMap.isMap ? (
          <Row className="suggestion-container__lists">
            <Row className="suggestion-container__lists__items">
              <SuggesstionLists listsfour={false} />
            </Row>
            <Row className="suggestion-container__lists__map">
              <SuggesstionMap />
            </Row>
          </Row>
        ) : (
          <Row className="suggestion-container__lists">
            <Row className="suggestion-container__lists__items listsfour">
              <SuggesstionLists listsfour={true} />
            </Row>
          </Row>
        )}
      </Row> */}

      {/* Modal Filters */}
      <Drawer
        title="Tìm theo bộ lọc"
        placement="right"
        size="default"
        key="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        className="drawer-filters"
        width={430}
        extra={
          <Space>
            <Button onClick={onClose}>Hoàn tác</Button>
            <Button onClick={onClose} type="primary">
              Tìm kiếm
            </Button>
          </Space>
        }
      >
        <Row className="drawer-filters__items">
          <AccommodationFilterLeft />
        </Row>
      </Drawer>
      {viewMap.isMap ? '' : <Footer />}
    </Fragment>
  );
};
