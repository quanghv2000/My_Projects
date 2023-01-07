import { Select } from 'antd';
import { FormLabel } from 'app/components/form-label';
import EnSVG from 'assets/en.svg';
import VnSVG from 'assets/vi.svg';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

export function LanguageSwitch() {
  const { Option } = Select;

  const { i18n } = useTranslation();
  const handleLanguageChange = (value: any) => {
    const language = value;
    i18n.changeLanguage(language);
  };

  return (
    <Wrapper>
      <Select
        showArrow={false}
        defaultValue={'en'}
        style={{ width: 50, paddingTop: 6 }}
        onChange={handleLanguageChange}
      >
        <Option value="en">
          {' '}
          <img className="icon" src={EnSVG} alt="en" />
        </Option>
        <Option value="vn">
          <img className="icon" src={VnSVG} alt="vn" />
        </Option>
      </Select>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${FormLabel} {
    margin-bottom: 0.625rem;
  }
`;
