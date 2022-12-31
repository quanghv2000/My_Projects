import {
  ExportOutlined,
  EyeOutlined,
  LockOutlined,
  PlusCircleOutlined,
  SafetyOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { ButtonType } from '../../types';

export const getIconBtn = (type: ButtonType): JSX.Element | null => {
  switch (type) {
    case 'view':
      return <EyeOutlined />;
    case 'add':
      return <PlusCircleOutlined />;
    case 'update':
      return null;
    case 'delete':
      return null;
    case 'export':
      return <ExportOutlined />;
    case 'lock':
      return <LockOutlined />;
    case 'unlock':
      return <UnlockOutlined />;
    case 'verify':
      return <SafetyOutlined />;
    default:
      return null;
  }
};
