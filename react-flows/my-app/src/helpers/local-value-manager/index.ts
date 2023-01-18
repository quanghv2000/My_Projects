import _ from 'lodash';

type LocalValueType = {
  [key: string]: any;
};

type ValueHolderType = {
  [key: string]: LocalValueType;
};

interface ILocalValueParams {
  key: string;
  value?: any;
}

export class LocalValueManager {
  private valueHolder: ValueHolderType = {};

  private itemId: string | null = null;

  constructor(itemId: string) {
    this.itemId = itemId;
    this.valueHolder[itemId] = {};
  }

  setValue(params: ILocalValueParams) {
    const { key, value } = params;
    if (_.isNil(key) || _.isNil(this.itemId)) {
      return;
    }

    this.valueHolder[this.itemId][key] = value;
  }

  getValue(params: ILocalValueParams) {
    const { key } = params;
    if (_.isNil(key) || _.isNil(this.itemId)) {
      return null;
    }

    return this.valueHolder[this.itemId][key];
  }

  remove(params: Omit<ILocalValueParams, 'value'>) {
    const { key } = params;

    if (_.isNil(key) || _.isNil(this.itemId)) return;
    if (this.valueHolder[this.itemId][key]) delete this.valueHolder[this.itemId][key];
  }

  reset() {
    this.valueHolder = {};
    this.itemId = null;
  }
}

export default {};
