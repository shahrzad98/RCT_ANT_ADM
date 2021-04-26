import { CurrencyDisplay } from '../../types';
import { useGlobalization } from './index';

const useNumberFormat = () => {
  const { culture } = useGlobalization();

  const simple = (number: number) => {
    return new Intl.NumberFormat().format(number);
  };

  const currency = (number: number, currency?: string, currencyDisplay?: CurrencyDisplay) => {
    return new Intl.NumberFormat(culture.Name, { style: 'currency', currency: 'IRR', currencyDisplay: currencyDisplay }).format(number);
  };

  return { simple, currency };
};

export default useNumberFormat;
