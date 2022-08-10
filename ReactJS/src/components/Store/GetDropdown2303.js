import { postApiWithoutReqAsyn, formatDateMMDDYY } from '../Services/PostAPI';
import { getApiBodyWithoutReqAsyn } from '../Services/GetAPI';
import { APIList } from './APIList';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

//export  function GetDropdown(type) {
export const GetDropdown = async (arg1, data) => {
  let result = {};
  result.result = 1;
  result.get = 0;
  var URL = '/Option/GetOptionDropdowndata';
  if (arg1) {
    URL = arg1;
  }
  await getApiBodyWithoutReqAsyn(URL, null).then((res) => {
    if (res.COUNTRY) {
      result.COUNTRY = res.COUNTRY.map((item) => ({
        name: item.COUNTRY,
        value: item.COUNTRY,
      }));
    }
    if (res.CREDIT_RATING) {
      result.CREDIT_RATING = res.CREDIT_RATING.map((item) => ({
        name: item.CREDIT_RATING,
        value: item.CREDIT_RATING,
      }));
    }
    if (res.TYPE_OF_ENTITY) {
      result.TYPE_OF_ENTITY = res.TYPE_OF_ENTITY.map((item) => ({
        name: item.TYPE_OF_INVESTOR,
        value: item.TYPE_OF_INVESTOR,
      }));
    }
    if (res.NAV_PROCESSING_ORDER) {
      result.NAV_PROCESSING_ORDER = res.NAV_PROCESSING_ORDER.map((item) => ({
        name: item.PROCESS_NAME,
        value: item.PROCESS_NAME,
      }));
    }

    if (res.COUNTERPARTS) {
      result.COUNTERPARTS = res.COUNTERPARTS.map((item) => ({
        name: item.COUNTERPARTY,
        value: item.COUNTERPARTY,
      }));
    }
    if (res.TYPE_OF_MODEL_PORTFOLIO) {
      result.TYPE_OF_MODEL_PORTFOLIO = res.TYPE_OF_MODEL_PORTFOLIO.map(
        (item) => ({
          name: item.TYPE_OF_MODEL_PORTFOLIO,
          value: item.TYPE_OF_MODEL_PORTFOLIO,
        })
      );
    }

    if (res.PARTNERS) {
      result.PARTNERS = res.PARTNERS.map((item) => ({
        name: item.PARTNER_ID,
        value: item.PARTNER_ID,
      }));
    }
    if (res.INVESTOR_ID) {
      result.INVESTOR_ID = res.INVESTOR_ID.map((item) => ({
        name: item.INVESTOR_ID,
        value: item.INVESTOR_ID,
      }));
    }
    if (res.REPOCURRENCY) {
      result.REPO_CURRENCY = res.REPOCURRENCY.map((item) => ({
        name: item.ISSUE_ID,
        value: item.ISSUE_ID,
      }));
    }

    if (res.TYPE_OF_CREDIT) {
      result.TYPE_OF_CREDIT = res.TYPE_OF_CREDIT.map((item) => ({
        name: item.TYPE_OF_CREDIT,
        value: item.TYPE_OF_CREDIT,
      }));
    }

    if (res.TYPE_OF_INVESTMENT) {
      result.TYPE_OF_INVESTMENT = res.TYPE_OF_INVESTMENT.map((item) => ({
        name: item.TYPE_OF_INVESTMENT,
        value: item.TYPE_OF_INVESTMENT,
      }));
    }

    if (res.ISSUER) {
      result.ISSUER = res.ISSUER.map((item) => ({
        name: item.COUNTERPARTY,
        value: item.COUNTERPARTY,
      }));
    }
    if (res.MAPPING_SECURITIES) {
      result.MAPPING_SECURITIES = res.MAPPING_SECURITIES.map((item) => ({
        name: item.BENCHMARK,
        value: item.BENCHMARK,
      }));
    }
    if (res.BENCHMARK) {
      result.BENCHMARK = res.BENCHMARK.map((item) => ({
        name: item.ISSUE_ID,
        value: item.ISSUE_ID,
      }));
    }
    if (res.TYPE_OF_MANAGEMENT_FEE_DAY_COUNT_BASE) {
      result.TYPE_OF_MANAGEMENT_FEE_DAY_COUNT_BASE = res.TYPE_OF_MANAGEMENT_FEE_DAY_COUNT_BASE.map(
        (item) => ({
          name: item.DAYCOUNT_BASE,
          value: item.DAYCOUNT_BASE,
        })
      );
    }

    if (res.TYPE_OF_MANAGEMENT_FEE_BASE) {
      result.TYPE_OF_MANAGEMENT_FEE_BASE = res.TYPE_OF_MANAGEMENT_FEE_BASE.map(
        (item) => ({
          name: item.DAILY_BASE,
          value: item.ID,
        })
      );
    }

    if (res.TYPE_OF_CONVENTION) {
      result.TYPE_OF_CONVENTION = res.TYPE_OF_CONVENTION.map((item) => ({
        name: item.TYPE_OF_CONVENTION,
        value: item.TYPE_OF_CONVENTION,
      }));
    }
    if (res.FUND_TO_TRANSFER) {
      result.FUND_TO_TRANSFER = res.FUND_TO_TRANSFER.map((item) => ({
        name: item.INVESTOR_ID,
        value: item.INVESTOR_ID,
      }));
    }
    if (res.REFERENCE_RATES) {
      result.REFERENCE_RATES = res.REFERENCE_RATES.map((item) => ({
        name: item.REFERENCE_RATES,
        value: item.REFERENCE_RATES,
      }));
    }

    if (res.TYPE_OF_UNDERLYING_ASSET) {
      result.TYPE_OF_UNDERLYING_ASSET = res.TYPE_OF_UNDERLYING_ASSET.map(
        (item) => ({
          name: item.POSITION_TYPE,
          value: item.POSITION_TYPE,
        })
      );
    }

    if (res.SETTLEMENT_CALENDAR) {
      result.SETTLEMENT_CALENDAR = res.SETTLEMENT_CALENDAR.map((item) => ({
        name: item.CALENDAR_NAME,
        value: item.CALENDAR_NAME,
      }));
    }

    if (res.TYPE_OF_MARKET_RISK) {
      result.TYPE_OF_MARKET_RISK = res.TYPE_OF_MARKET_RISK.map((item) => ({
        name: item.TYPE_OF_MARKET_RISK,
        value: item.TYPE_OF_MARKET_RISK,
      }));
    }
    if (res.SETTLEMENT_CALENDAR) {
      result.SETTLEMENT_CALENDAR = res.SETTLEMENT_CALENDAR.map((item) => ({
        name: item.CALENDAR_NAME,
        value: item.CALENDAR_NAME,
      }));
    }

    if (res.SOURCE_OF_PRICING) {
      result.SOURCE_OF_PRICING = res.TYPE_OF_PRICING_SOURCE.map((item) => ({
        name: item.SOURCE_NAME,
        value: item.SOURCE_NAME,
      }));
    }
    if (res.TYPE_OF_PRICING_SOURCE) {
      result.TYPE_OF_PRICING_SOURCE = res.TYPE_OF_PRICING_SOURCE.map(
        (item) => ({
          name: item.SOURCE_NAME,
          value: item.SOURCE_NAME,
        })
      );
    }

    if (res.CUSTODIANS) {
      result.CUSTODIANS = res.CUSTODIANS.map((item) => ({
        name: item.COUNTERPARTY,
        value: item.COUNTERPARTY,
      }));
    }
    if (res.INVESTORS) {
      result.INVESTORS = res.INVESTORS.map((item) => ({
        name: item.CUSTODIAN,
        value: item.CUSTODIAN,
      }));
    }
    if (res.INVESTORS_ID) {
      result.INVESTORS_ID = res.INVESTORS_ID.map((item) => ({
        name: item.INVESTOR_ID,
        value: item.INVESTOR_ID,
      }));
    }
    if (res.LC_WORD) {
      result.LC_WORD = res.LC_WORD.map((item) => ({
        name: item.TYPE_OF_TRADE,
        value: item.TYPE_OF_TRADE,
      }));
    }
    if (res.SUBWORD) {
      result.SUBWORD = res.SUBWORD.map((item) => ({
        name: item.SUBWORD,
        value: item.SUBWORD,
      }));
    }
    if (res.TYPE_OF_CASH_FLOW) {
      result.TYPE_OF_CASH_FLOW = res.TYPE_OF_CASH_FLOW.map((item) => ({
        name: item.TYPE_OF_CASH_FLOW,
        value: item.TYPE_OF_CASH_FLOW,
      }));
    }

    if (res.TYPE_OF_BLOOMBERG_YELLOW_KEY) {
      result.TYPE_OF_BLOOMBERG_YELLOW_KEY = res.TYPE_OF_BLOOMBERG_YELLOW_KEY.map(
        (item) => ({
          name: item.BLOOMBERG_YELLOWY_KEY,
          value: item.BLOOMBERG_YELLOWY_KEY,
        })
      );
    }

    if (res.PARENT_CURRENCY) {
      result.PARENT_CURRENCY = res.PARENT_CURRENCY.map((item) => ({
        name: item.TYPE_OF_PARENT_CURRENCY,
        value: item.TYPE_OF_PARENT_CURRENCY,
      }));
    }

    if (res.TYPE_OF_SERIES) {
      result.TYPE_OF_SERIES = res.TYPE_OF_SERIES.map((item) => ({
        name: item.TYPE_OF_SERIES,
        value: item.TYPE_OF_SERIES,
      }));
    }

    if (res.TYPE_OF_TENOR) {
      result.TYPE_OF_TENOR = res.TYPE_OF_TENOR.map((item) => ({
        name: item.TYPE_OF_TENOR,
        value: item.TYPE_OF_TENOR,
      }));
    }

    if (res.TYPE_OF_SECTOR) {
      result.TYPE_OF_SECTOR = res.TYPE_OF_SECTOR.map((item) => ({
        name: item.TYPE_OF_SECTOR,
        value: item.TYPE_OF_SECTOR,
      }));
    }
    if (res.TYPE_OF_STRATEGY) {
      result.TYPE_OF_STRATEGY = res.TYPE_OF_STRATEGY.map((item) => ({
        name: item.INVESTMENT_OBJECTIVE,
        value: item.INVESTMENT_OBJECTIVE,
      }));
    }
    if (res.BOOK) {
      result.BOOK = res.BOOK.map((item) => ({
        name: item.BOOK_NAME,
        value: item.BOOK_NAME,
      }));
    }

    if (res.COUNTERPARTY) {
      result.COUNTERPARTY = res.COUNTERPARTY.map((item) => ({
        name: item.COUNTERPARTY,
        value: item.COUNTERPARTY,
      }));
    }

    if (res.ISSUE_ID) {
      result.ISSUE_ID = res.ISSUE_ID.map((item) => ({
        name: item.ISSUE_ID,
        value: item.ISSUE_ID,
      }));
    }

    if (res.STRATEGY) {
      result.STRATEGY = res.STRATEGY.map((item) => ({
        name: item.STRATEGY_NAME,
        value: item.STRATEGY_NAME,
      }));
    }

    if (res.TYPE_OF_ASSET) {
      result.TYPE_OF_ASSET = res.TYPE_OF_ASSET.map((item) => ({
        name: item.POSITION_TYPE,
        value: item.POSITION_TYPE,
      }));
    }
    if (res.PRIMARY_FUND) {
      result.PRIMARY_FUND = res.PRIMARY_FUND.map((item) => ({
        name: item.INVESTOR_ID,
        value: item.INVESTOR_ID,
      }));
    }
    if (res.MANAGERS) {
      result.MANAGERS = res.MANAGERS.map((item) => ({
        name: item.MANAGER,
        value: item.ID_MANAGER_NUMBER,
      }));
    }
    if (res.TRADER_ID) {
      result.TRADER_ID = res.TRADER_ID.map((item) => ({
        name: item.TRADER_ID,
        value: item.TRADER_ID,
      }));
    }
    if (res.FUND) {
      result.FUND = res.FUND.map((item) => ({
        name: item.INVESTOR_ID,
        value: item.INVESTOR_ID,
      }));
    }
    if (res.EXPENSE_TYPE) {
      result.EXPENSE_TYPE = res.EXPENSE_TYPE.map((item) => ({
        name: item.EXPENSE_TYPE,
        value: item.EXPENSE_TYPE,
      }));
    }
    if (res.EXPENSE_SUB_TYPE) {
      result.EXPENSE_SUB_TYPE = res.EXPENSE_SUB_TYPE.map((item) => ({
        name: item.EXPENSE_SUB_TYPE,
        value: item.EXPENSE_SUB_TYPE,
      }));
    }

    if (res.TYPE_OF_CASH_FLOWS) {
      result.TYPE_OF_CASH_FLOWS = res.TYPE_OF_CASH_FLOWS.map((item) => ({
        name: item.TYPE_OF_CASH_FLOW,
        value: item.TYPE_OF_CASH_FLOW,
      }));
    }

    if (res.CURRENCY) {
      result.CURRENCY = res.CURRENCY.map((item) => ({
        name: item.ISSUE_ID,
        value: item.ISSUE_ID,
      }));
    }
    result.get = 1;
  });
  if (result.get === 1) {
    //
    return getDropdowndata(result);
  }
};

export const GetDropdownpost = async (arg1, data) => {
  let result = {};
  result.result = 1;
  result.get = 0;
  var URL = '';
  if (arg1) {
    URL = APIList[arg1];
  }
  await postApiWithoutReqAsyn(URL, data).then((res) => {
    if (res.UNDERLYING_ASSET) {
      result.UNDERLYING_ASSET = res.UNDERLYING_ASSET.map((item) => ({
        name: item.ISSUE_ID,
        value: item.ISSUE_ID,
      }));
    }
  });
  return result;
};

let ArraytoObjectArray = (dropDownList) => {
  let result = [];
  for (var i = 0; i < dropDownList.length; i++) {
    let option = { value: dropDownList[i], name: dropDownList[i] };
    result.push(option);
  }

  return result;
};
let getDropdowndata = (initinalFormFill) => {
  //let dropDownList= ['STRATEGY','FUND','TRADER_ID','COUNTERPARTY','EUROCLEAR','CLEARING_AGENT','CUSTODIAN','CLEARING_AGENT','REPO_CURRENCY','BOOK', 'SOURCE_OF_PRICING','MAPPING_SECURITY,ADR','PRIMARY_FUND','MANAGER','CLASS','SERIES','PF_REPRESENTATIVE_SHARE','BENCHMARKF','BENCHMARK','COUNTRY','TYPE_OF_CREDIT','TYPE_OF_INVESTMENT','CREDIT_RATING','TYPE_OF_MARKET_RISK','CURRENCY','PARENT_CURRENCY','MNGMNT_FEE_CALC_PERIOD'];
  let TYPE_OF_SETTLEMENT = ['CASH', 'PHYSICAL DELIVERY'];
  let CONVENTION = ['ACTUAL/360', 'ACTUAL/365', '30/360'];
  let TYPE_OF_REPO = [
    'OPENING FUNDING',
    'CLOSING FUNDING',
    'OPENING BORROWING',
    'CLOSING BORROWING',
    'PARTIAL FUNDING CLOSING',
    'PARTIAL BORROWING CLOSING',
  ];
  let CATEGORY = ['FIXED', 'VARIABLE'];
  let YES_NO = ['YES', 'NO'];
  let PAYMENT_METHOD = ['CHECK', 'WIRE', 'CREDIT CARD', 'CHARGE TO ACCOUNT'];
  let TYPE_OF_AMORTIZATION = ['PRE-PAYMENT', 'POST-PAYMENT'];
  let FRECUENCY_OF_PRINCIPAL_PAYMENTS = ['MONTHLY'];
  let Type_of_Flow = ['EXPENSE', 'INCOME'];
  //["MONTHLY";12;"QUARTERLY";4;"SEMI-ANNUALLY";2;"ANNUALLY";1;0;"NONE"]
  initinalFormFill['TYPE_OF_SETTLEMENT'] = ArraytoObjectArray(
    TYPE_OF_SETTLEMENT
  );
  initinalFormFill['CONVENTION'] = ArraytoObjectArray(CONVENTION);
  initinalFormFill['ADR'] = ArraytoObjectArray(YES_NO);
  initinalFormFill['RE_Rate'] = ArraytoObjectArray(YES_NO);
  initinalFormFill['TYPE_OF_REPO'] = ArraytoObjectArray(TYPE_OF_REPO);
  initinalFormFill['OPEN'] = ArraytoObjectArray(YES_NO);
  initinalFormFill['EUROCLEAR'] = ArraytoObjectArray(YES_NO);
  initinalFormFill['RENTAL'] = ArraytoObjectArray(YES_NO);
  initinalFormFill['CASH_FLOW'] = ArraytoObjectArray(YES_NO);
  initinalFormFill['AMORTIZABLE'] = ArraytoObjectArray(YES_NO);
  initinalFormFill['TYPE_OF_AMORTIZATION'] = ArraytoObjectArray(
    TYPE_OF_AMORTIZATION
  );
  initinalFormFill['FRECUENCY_OF_PRINCIPAL_PAYMENTS'] = ArraytoObjectArray(
    FRECUENCY_OF_PRINCIPAL_PAYMENTS
  );
  initinalFormFill['FILL_AMORTIZATION_TABLE_NOW'] = ArraytoObjectArray(YES_NO);
  initinalFormFill['Type_of_Flow'] = ArraytoObjectArray(Type_of_Flow);

  initinalFormFill['CATEGORY'] = ArraytoObjectArray(CATEGORY);
  initinalFormFill['PAYMENT_METHOD'] = ArraytoObjectArray(PAYMENT_METHOD);

  return initinalFormFill;
};

export let datalist = {
  count: [
    {
      TABLE_COUNT: 34,
    },
  ],
  currency: [
    {
      ISSUE_ID: 'AAA',
      CUSTODIAN_SEC_ID: null,
      ENTRY_DATE: '2020-12-23T08:36:13',
      ISIN_NUMBER: '',
      CUSIP: null,
      FIGI: null,
      SEDOL: null,
      'TICKER ID': null,
      CURRENCY: 'USD',
      TYPE_OF_ASSET: 'CURRENCIES',
      TYPE_OF_INVESTMENT: 'EQUITY',
      MARKET_PRICE: null,
      FAIR_VALUE_PRICE: null,
      ADJ_PRICE: 0,
      LAST_MARKET_PRICE: 0,
      LAST_FAIR_VALUE_PRICE: 0,
      PARENT_CURRENCY_FV_PRICE: 0,
      THEORETICAL_PRICE: 0,
      SUB_CURRENCY: false,
      PARENT_CURRENCY: 'USD',
      EXCHANGE: null,
      QUANTITY: 0,
      VOLATILITY: 0,
      DIVIDEND_YIELD: 0,
      INTEREST_RATE: 0,
      INTEREST_RATE_SHORT: 0,
      ACCRUED_INTEREST: 0,
      ACCRUED_ESTIMATE: null,
      CONVERTIBILITY: 0,
      FXPOSITION: 0,
      DELTA: 1,
      THETA: 0,
      GAMMA: 0,
      VEGA: 0,
      RHO: 0,
      RHO1: 0,
      MATURITY_DATE: '2099-12-30T00:00:00',
      MATURITY_SETTLEMENT_DATE: '2099-12-30T00:00:00',
      FX: 1,
      LAST_FX: 1,
      FAIR_VALUE_PRICE_TEMPORARY: 0,
      SIZE_OF_CONTRACT: 0,
      ALIAS: null,
      REUTERS_FEED: null,
      SOURCE_ID: null,
      BLOOMBERG_ALIAS: null,
      BLOOMBERG_YELLOW_KEY: null,
      DEFLT_RISK: 0,
      COUNTRY: 'EASTERN EUROPE',
      MAPPING_SECURITY: null,
      MAPPING_DERIVATIVE: null,
      CREDIT_RATING: 'BBB',
      TYPE_OF_CREDIT: 'CORPORATE',
      RATING: 'A',
      LIQUIDITY: null,
      LIQUIDITY_RATING: null,
      LUZ_CAPITAL_RAITING: null,
      LAST_ELECTRONIC_FEED: null,
      TYPE_OF_PRICING_SOURCE: 'MANUAL',
      SETTLEMENT_CALENDAR: 'ARGENTINA',
      dAYS_FROM_TRADE_TO_SETTLEMENT: null,
      DAYS_FROM_MAT_TO_SET: 0,
      FATCA_TAX_ADJUSTMENT: 1,
      BORROWING_COST: 0,
      SUB_CURRENCY_PRICE: 1,
      ALTERED: null,
      BENCHMARK: false,
      CORPORATE_RESOLUTION_SOURCE: null,
      FUND_TYPE: null,
      FUND_STRATEGY: null,
      MARKET_CAP_FOCUS: null,
      INDUSTRY: null,
      LIABILITY_PAYMENT_RANK: null,
      SUB_INDUSTRY: null,
      TYPE_OF_TENOR: null,
      TYPE_OF_RATING: null,
      TYPE_OF_MARKET_RISK: 'CERTIFICATE OF DEPOSIT',
      IS_NEW_SECURITY: false,
      NEXT_SETTLEMENT_DATE: null,
      'ALTERNATE_PRICING SOURCE': null,
      ISSUE_ID1: 'AAA',
      TYPE_OF_MARKET_QUOTATION: null,
      LAST_UPDATE: null,
      BLOOMBERG_FWD_ID: null,
      ISO_ID: null,
      SUB_CURRENCY1: false,
      UNDERLYING_ASSET: null,
      DESCRIPTION: 'SOME TEST',
    },
    {
      ISSUE_ID: 'ARP',
      CUSTODIAN_SEC_ID: null,
      ENTRY_DATE: '2020-12-21T14:45:54',
      ISIN_NUMBER: '',
      CUSIP: null,
      FIGI: null,
      SEDOL: null,
      'TICKER ID': null,
      CURRENCY: 'USD',
      TYPE_OF_ASSET: 'CURRENCIES',
      TYPE_OF_INVESTMENT: 'EQUITY',
      MARKET_PRICE: null,
      FAIR_VALUE_PRICE: null,
      ADJ_PRICE: 1,
      LAST_MARKET_PRICE: 0,
      LAST_FAIR_VALUE_PRICE: 0,
      PARENT_CURRENCY_FV_PRICE: 1,
      THEORETICAL_PRICE: 0,
      SUB_CURRENCY: false,
      PARENT_CURRENCY: 'BRL',
      EXCHANGE: null,
      QUANTITY: 0,
      VOLATILITY: 0,
      DIVIDEND_YIELD: 0,
      INTEREST_RATE: 0,
      INTEREST_RATE_SHORT: 0,
      ACCRUED_INTEREST: 0,
      ACCRUED_ESTIMATE: null,
      CONVERTIBILITY: 1,
      FXPOSITION: 1,
      DELTA: 1,
      THETA: 0,
      GAMMA: 0,
      VEGA: 0,
      RHO: 0,
      RHO1: 0,
      MATURITY_DATE: '2099-12-30T00:00:00',
      MATURITY_SETTLEMENT_DATE: '2099-12-30T00:00:00',
      FX: 0,
      LAST_FX: 0,
      FAIR_VALUE_PRICE_TEMPORARY: 0,
      SIZE_OF_CONTRACT: 0,
      ALIAS: null,
      REUTERS_FEED: null,
      SOURCE_ID: null,
      BLOOMBERG_ALIAS: null,
      BLOOMBERG_YELLOW_KEY: 'NO',
      DEFLT_RISK: 0,
      COUNTRY: 'AR',
      MAPPING_SECURITY: null,
      MAPPING_DERIVATIVE: null,
      CREDIT_RATING: 'AA',
      TYPE_OF_CREDIT: 'SOVEREIGN',
      RATING: 'A',
      LIQUIDITY: null,
      LIQUIDITY_RATING: null,
      LUZ_CAPITAL_RAITING: null,
      LAST_ELECTRONIC_FEED: '2020-07-17T00:00:00',
      TYPE_OF_PRICING_SOURCE: 'BLOOMBERG',
      SETTLEMENT_CALENDAR: 'ARGENTINA',
      dAYS_FROM_TRADE_TO_SETTLEMENT: 0,
      DAYS_FROM_MAT_TO_SET: 0,
      FATCA_TAX_ADJUSTMENT: 1,
      BORROWING_COST: 0,
      SUB_CURRENCY_PRICE: 1,
      ALTERED: null,
      BENCHMARK: false,
      CORPORATE_RESOLUTION_SOURCE: null,
      FUND_TYPE: null,
      FUND_STRATEGY: null,
      MARKET_CAP_FOCUS: null,
      INDUSTRY: null,
      LIABILITY_PAYMENT_RANK: null,
      SUB_INDUSTRY: null,
      TYPE_OF_TENOR: null,
      TYPE_OF_RATING: null,
      TYPE_OF_MARKET_RISK: 'DPF',
      IS_NEW_SECURITY: false,
      NEXT_SETTLEMENT_DATE: '2020-11-13T00:00:00',
      'ALTERNATE_PRICING SOURCE': null,
      ISSUE_ID1: 'ARP',
      TYPE_OF_MARKET_QUOTATION: 'CURRENCY/USD',
      LAST_UPDATE: '1900-01-01T00:00:00',
      BLOOMBERG_FWD_ID: '1',
      ISO_ID: '',
      SUB_CURRENCY1: false,
      UNDERLYING_ASSET: '',
      DESCRIPTION: 'ARGENTINA PESO',
    },
    {
      ISSUE_ID: 'BAID',
      CUSTODIAN_SEC_ID: null,
      ENTRY_DATE: '2020-12-23T06:28:59',
      ISIN_NUMBER: '',
      CUSIP: null,
      FIGI: null,
      SEDOL: null,
      'TICKER ID': null,
      CURRENCY: 'USD',
      TYPE_OF_ASSET: 'CURRENCIES',
      TYPE_OF_INVESTMENT: 'EQUITY',
      MARKET_PRICE: null,
      FAIR_VALUE_PRICE: null,
      ADJ_PRICE: 0,
      LAST_MARKET_PRICE: 0,
      LAST_FAIR_VALUE_PRICE: 0,
      PARENT_CURRENCY_FV_PRICE: 0,
      THEORETICAL_PRICE: 0,
      SUB_CURRENCY: false,
      PARENT_CURRENCY: 'BRL',
      EXCHANGE: null,
      QUANTITY: 0,
      VOLATILITY: 0,
      DIVIDEND_YIELD: 0,
      INTEREST_RATE: 0,
      INTEREST_RATE_SHORT: 0,
      ACCRUED_INTEREST: 0,
      ACCRUED_ESTIMATE: null,
      CONVERTIBILITY: 0,
      FXPOSITION: 0,
      DELTA: 1,
      THETA: 0,
      GAMMA: 0,
      VEGA: 0,
      RHO: 0,
      RHO1: 0,
      MATURITY_DATE: '2099-12-30T00:00:00',
      MATURITY_SETTLEMENT_DATE: '2099-12-30T00:00:00',
      FX: 0,
      LAST_FX: 1,
      FAIR_VALUE_PRICE_TEMPORARY: 0,
      SIZE_OF_CONTRACT: 0,
      ALIAS: null,
      REUTERS_FEED: null,
      SOURCE_ID: null,
      BLOOMBERG_ALIAS: null,
      BLOOMBERG_YELLOW_KEY: null,
      DEFLT_RISK: 0,
      COUNTRY: null,
      MAPPING_SECURITY: null,
      MAPPING_DERIVATIVE: null,
      CREDIT_RATING: 'AA',
      TYPE_OF_CREDIT: 'CORPORATE',
      RATING: 'A',
      LIQUIDITY: null,
      LIQUIDITY_RATING: null,
      LUZ_CAPITAL_RAITING: null,
      LAST_ELECTRONIC_FEED: null,
      TYPE_OF_PRICING_SOURCE: 'MANUAL',
      SETTLEMENT_CALENDAR: 'CHINA',
      dAYS_FROM_TRADE_TO_SETTLEMENT: null,
      DAYS_FROM_MAT_TO_SET: 0,
      FATCA_TAX_ADJUSTMENT: 1,
      BORROWING_COST: 0,
      SUB_CURRENCY_PRICE: 1,
      ALTERED: null,
      BENCHMARK: false,
      CORPORATE_RESOLUTION_SOURCE: null,
      FUND_TYPE: null,
      FUND_STRATEGY: null,
      MARKET_CAP_FOCUS: null,
      INDUSTRY: null,
      LIABILITY_PAYMENT_RANK: null,
      SUB_INDUSTRY: null,
      TYPE_OF_TENOR: null,
      TYPE_OF_RATING: null,
      TYPE_OF_MARKET_RISK: 'ALTERNATIVE',
      IS_NEW_SECURITY: false,
      NEXT_SETTLEMENT_DATE: null,
      'ALTERNATE_PRICING SOURCE': null,
      ISSUE_ID1: 'BAID',
      TYPE_OF_MARKET_QUOTATION: null,
      LAST_UPDATE: null,
      BLOOMBERG_FWD_ID: null,
      ISO_ID: null,
      SUB_CURRENCY1: false,
      UNDERLYING_ASSET: null,
      DESCRIPTION: 'TEST',
    },
    {
      ISSUE_ID: 'BRL',
      CUSTODIAN_SEC_ID: null,
      ENTRY_DATE: '2020-12-21T14:44:38',
      ISIN_NUMBER: '',
      CUSIP: '0',
      FIGI: 'BBG0013HFYW0',
      SEDOL: '0',
      'TICKER ID': null,
      CURRENCY: 'USD',
      TYPE_OF_ASSET: 'CURRENCIES',
      TYPE_OF_INVESTMENT: 'EQUITY',
      MARKET_PRICE: null,
      FAIR_VALUE_PRICE: null,
      ADJ_PRICE: 5.3862,
      LAST_MARKET_PRICE: 0,
      LAST_FAIR_VALUE_PRICE: 0,
      PARENT_CURRENCY_FV_PRICE: 5.3862,
      THEORETICAL_PRICE: 0,
      SUB_CURRENCY: false,
      PARENT_CURRENCY: 'BRL',
      EXCHANGE: null,
      QUANTITY: 0,
      VOLATILITY: 0,
      DIVIDEND_YIELD: 0,
      INTEREST_RATE: 0,
      INTEREST_RATE_SHORT: 0,
      ACCRUED_INTEREST: 0,
      ACCRUED_ESTIMATE: null,
      CONVERTIBILITY: 5.3862,
      FXPOSITION: 5.3862,
      DELTA: 5.3862,
      THETA: 0,
      GAMMA: 0,
      VEGA: 0,
      RHO: 0,
      RHO1: 0,
      MATURITY_DATE: '2099-12-30T00:00:00',
      MATURITY_SETTLEMENT_DATE: '2099-12-30T00:00:00',
      FX: 0,
      LAST_FX: 0,
      FAIR_VALUE_PRICE_TEMPORARY: 0,
      SIZE_OF_CONTRACT: 0,
      ALIAS: null,
      REUTERS_FEED: null,
      SOURCE_ID: null,
      BLOOMBERG_ALIAS: 'BRL',
      BLOOMBERG_YELLOW_KEY: 'Curncy',
      DEFLT_RISK: 0,
      COUNTRY: 'BR',
      MAPPING_SECURITY: null,
      MAPPING_DERIVATIVE: null,
      CREDIT_RATING: null,
      TYPE_OF_CREDIT: 'SOVEREIGN',
      RATING: 'A',
      LIQUIDITY: null,
      LIQUIDITY_RATING: null,
      LUZ_CAPITAL_RAITING: null,
      LAST_ELECTRONIC_FEED: '2020-07-17T00:00:00',
      TYPE_OF_PRICING_SOURCE: 'YAHOO',
      SETTLEMENT_CALENDAR: 'BRAZIL',
      dAYS_FROM_TRADE_TO_SETTLEMENT: 0,
      DAYS_FROM_MAT_TO_SET: null,
      FATCA_TAX_ADJUSTMENT: 1,
      BORROWING_COST: 0,
      SUB_CURRENCY_PRICE: 1,
      ALTERED: null,
      BENCHMARK: false,
      CORPORATE_RESOLUTION_SOURCE: null,
      FUND_TYPE: '',
      FUND_STRATEGY: '',
      MARKET_CAP_FOCUS: '',
      INDUSTRY: '',
      LIABILITY_PAYMENT_RANK: '',
      SUB_INDUSTRY: '',
      TYPE_OF_TENOR: '',
      TYPE_OF_RATING: '',
      TYPE_OF_MARKET_RISK: 'CURRENCY',
      IS_NEW_SECURITY: false,
      NEXT_SETTLEMENT_DATE: '2020-11-13T00:00:00',
      'ALTERNATE_PRICING SOURCE': null,
      ISSUE_ID1: 'BRL',
      TYPE_OF_MARKET_QUOTATION: 'CURRENCY/USD',
      LAST_UPDATE: null,
      BLOOMBERG_FWD_ID: null,
      ISO_ID: null,
      SUB_CURRENCY1: false,
      UNDERLYING_ASSET: null,
      DESCRIPTION: 'MONEDA DE BRAZIL Test',
    },
    {
      ISSUE_ID: 'CAD',
      CUSTODIAN_SEC_ID: null,
      ENTRY_DATE: '2020-11-13T00:00:00',
      ISIN_NUMBER: '',
      CUSIP: null,
      FIGI: 'BBG0013HG2R5',
      SEDOL: '0',
      'TICKER ID': null,
      CURRENCY: 'USD',
      TYPE_OF_ASSET: 'CURRENCIES',
      TYPE_OF_INVESTMENT: null,
      MARKET_PRICE: 0.7612667679786682,
      FAIR_VALUE_PRICE: 0.7612667679786682,
      ADJ_PRICE: 0.7612667679786682,
      LAST_MARKET_PRICE: 0,
      LAST_FAIR_VALUE_PRICE: 0,
      PARENT_CURRENCY_FV_PRICE: 0.7612667679786682,
      THEORETICAL_PRICE: null,
      SUB_CURRENCY: false,
      PARENT_CURRENCY: 'CAD',
      EXCHANGE: null,
      QUANTITY: 0,
      VOLATILITY: 0,
      DIVIDEND_YIELD: 0,
      INTEREST_RATE: 0,
      INTEREST_RATE_SHORT: 0,
      ACCRUED_INTEREST: 0,
      ACCRUED_ESTIMATE: null,
      CONVERTIBILITY: 0.7612667679786682,
      FXPOSITION: 0.7612667679786682,
      DELTA: 0.7612667679786682,
      THETA: 0,
      GAMMA: 0,
      VEGA: 0,
      RHO: 0,
      RHO1: 0,
      MATURITY_DATE: '2099-12-31T00:00:00',
      MATURITY_SETTLEMENT_DATE: '2099-12-31T00:00:00',
      FX: 1,
      LAST_FX: 0,
      FAIR_VALUE_PRICE_TEMPORARY: 0,
      SIZE_OF_CONTRACT: 1,
      ALIAS: null,
      REUTERS_FEED: null,
      SOURCE_ID: null,
      BLOOMBERG_ALIAS: 'CAD',
      BLOOMBERG_YELLOW_KEY: 'Curncy',
      DEFLT_RISK: 0,
      COUNTRY: 'CA',
      MAPPING_SECURITY: null,
      MAPPING_DERIVATIVE: null,
      CREDIT_RATING: 'CURRENCIES',
      TYPE_OF_CREDIT: 'SOVEREIGN',
      RATING: 'A',
      LIQUIDITY: null,
      LIQUIDITY_RATING: null,
      LUZ_CAPITAL_RAITING: null,
      LAST_ELECTRONIC_FEED: '2020-11-13T00:00:00',
      TYPE_OF_PRICING_SOURCE: 'YAHOO',
      SETTLEMENT_CALENDAR: 'CANADA',
      dAYS_FROM_TRADE_TO_SETTLEMENT: 0,
      DAYS_FROM_MAT_TO_SET: null,
      FATCA_TAX_ADJUSTMENT: 1,
      BORROWING_COST: 0,
      SUB_CURRENCY_PRICE: 1,
      ALTERED: null,
      BENCHMARK: false,
      CORPORATE_RESOLUTION_SOURCE: null,
      FUND_TYPE: '',
      FUND_STRATEGY: '',
      MARKET_CAP_FOCUS: '',
      INDUSTRY: '',
      LIABILITY_PAYMENT_RANK: '',
      SUB_INDUSTRY: '',
      TYPE_OF_TENOR: '',
      TYPE_OF_RATING: '',
      TYPE_OF_MARKET_RISK: 'CURRENCY',
      IS_NEW_SECURITY: false,
      NEXT_SETTLEMENT_DATE: '2020-11-13T00:00:00',
      'ALTERNATE_PRICING SOURCE': null,
      ISSUE_ID1: 'CAD',
      TYPE_OF_MARKET_QUOTATION: 'CURRENCY/USD',
      LAST_UPDATE: null,
      BLOOMBERG_FWD_ID: null,
      ISO_ID: null,
      SUB_CURRENCY1: false,
      UNDERLYING_ASSET: null,
      DESCRIPTION: 'CANADIAN DOLLAR',
    },
  ],
};

export const SetRefDate = async (data) => {
  let resdata = {};
  var URL = '/ReferenceDate/SetReferenceDate';
  let reqObject = {
    REFERENCE_DATE: formatDateMMDDYY(data),
    USER_ID: cookies.get('USER_ID'),
    USER_NAME: cookies.get('USER_NAME'),
    JUSTIFICATION: 'Data Entry',
    PCID: '',
  };
  await postApiWithoutReqAsyn(URL, reqObject).then((res) => {
    resdata = res;
  });
  return resdata;
};
