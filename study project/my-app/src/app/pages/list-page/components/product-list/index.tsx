import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from 'types/RootState';
import { ExportFile } from 'app/components/export-file';

export const ProductList: React.FC = () => {
  /** @Stored_Data */
  const storedData = useSelector((state: IRootState) => state);
  const { productInfoList } = storedData.ListPageReducer;

  return (
    <div className="products-table">
      <div className="d-flex justify-content-between align-items-center">
        <h3>Product List</h3>
        <ExportFile data={productInfoList} filename="products" tableId="products-table" />
      </div>
      <br />
      <table className="table table-striped table-bordered" id="products-table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product name</th>
            <th scope="col">Price</th>
            <th scope="col">Created by</th>
            <th scope="col">Created date</th>
            <th scope="col">Last modified by</th>
            <th scope="col">Last modified date</th>
          </tr>
        </thead>
        <tbody>
          {productInfoList.map((product, index) => (
            <tr key={index}>
              <th>{product.id}</th>
              <td>{product.name}</td>
              <td>${product.price?.toLocaleString()}</td>
              <td>{product.createdBy}</td>
              <td>{new Date().toDateString()}</td>
              <td>{product.lastModifiedBy}</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
