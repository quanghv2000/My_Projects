import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DATA_ACTIONS } from 'store/actions/data';
import { DATA_PERSIST_ACTIONS } from 'store/actions/data-persist';
import { IRootState } from 'types/RootState';

export const HomePage: React.FC = () => {
  const storedData = useSelector((state: IRootState) => state);
  const { data, dataPersist } = storedData;

  const dispatch = useDispatch();

  console.log('data: ', data);
  console.log('dataPersist: ', dataPersist);

  return (
    <div style={{ height: '500px', textAlign: 'center' }}>
      <br />
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: DATA_ACTIONS.SET_CONTENTS,
            payload: {
              contents: 'NORMAL_DATA'
            }
          });
        }}
      >
        Normal Data
      </button>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          dispatch({
            type: DATA_PERSIST_ACTIONS.SET_CONTENTS,
            payload: {
              contents: 'DATA_PERSISIT'
            }
          });
        }}
      >
        Data Persisit
      </button>
      <h3>normal data: {data.contents}</h3>
      <h3>data persist: {dataPersist.contents}</h3>
    </div>
  );
};
