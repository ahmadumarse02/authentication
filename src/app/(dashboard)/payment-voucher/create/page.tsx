"use client";

import { useFieldArray, useForm } from 'react-hook-form';

type VoucherRow = {
  sn: number;
  class: string;
  description: string;
  qty: number;
  unitPrice: number;
  vatPercent: number;
  whtPercent: number;
};

type PaymentVoucherData = {
  subject: string;
  rows: VoucherRow[];
  beneficiary: {
    accountName: string;
    accountNumber: string;
    bankName: string;
  };
};

function PaymentVoucher() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentVoucherData>({
    defaultValues: {
      rows: [
        {
          sn: 1,
          class: 'Consultancy service',
          description: 'FARS',
          qty: 1,
          unitPrice: 1000000,
          vatPercent: 7.5,
          whtPercent: 2.5,
        },
        {
          sn: 2,
          class: 'Consultancy service',
          description: 'Tax Service',
          qty: 1,
          unitPrice: 500000,
          vatPercent: 7.5,
          whtPercent: 10,
        },
      ],
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: 'rows',
  });

  const onSubmit = (data: PaymentVoucherData) => {
    console.log('Voucher submitted:', data);
    // Handle form submission
  };

  const watchRows = watch('rows');

  const calculateRow = (row: VoucherRow, index: number) => {
    const qty = Number(watchRows[index]?.qty) || 0;
    const unitPrice = Number(watchRows[index]?.unitPrice) || 0;
    const vatPercent = Number(watchRows[index]?.vatPercent) || 0;
    const whtPercent = Number(watchRows[index]?.whtPercent) || 0;

    const amount = qty * unitPrice;
    const vatAmount = amount * (vatPercent / 100);
    const grossAmount = amount + vatAmount;
    const whtAmount = grossAmount * (whtPercent / 100);
    const netAmount = grossAmount - whtAmount;

    return {
      amount,
      vatAmount,
      grossAmount,
      whtAmount,
      netAmount,
    };
  };

  const calculateTotals = () => {
    return watchRows.reduce(
      (acc, row, index) => {
        const calculated = calculateRow(row, index);
        return {
          amount: acc.amount + calculated.amount,
          vatAmount: acc.vatAmount + calculated.vatAmount,
          grossAmount: acc.grossAmount + calculated.grossAmount,
          whtAmount: acc.whtAmount + calculated.whtAmount,
          netAmount: acc.netAmount + calculated.netAmount,
        };
      },
      {
        amount: 0,
        vatAmount: 0,
        grossAmount: 0,
        whtAmount: 0,
        netAmount: 0,
      }
    );
  };

  const totals = calculateTotals();

  const addNewRow = () => {
    append({
      sn: fields.length + 1,
      class: '',
      description: '',
      qty: 1,
      unitPrice: 0,
      vatPercent: 0,
      whtPercent: 0,
    });
  };

    function numberToWords(netAmount: number): import("react").ReactNode {
        const units = [
            "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"
        ];
        const teens = [
            "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"
        ];
        const tens = [
            "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
        ];
        const thousands = [
            "", "Thousand", "Million", "Billion"
        ];

        if (netAmount === 0) return "Zero";

        const convertToWords = (num: number): string => {
            if (num < 10) return units[num];
            if (num < 20) return teens[num - 10];
            if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? " " + units[num % 10] : "");
            if (num < 1000) return units[Math.floor(num / 100)] + " Hundred" + (num % 100 !== 0 ? " and " + convertToWords(num % 100) : "");
            for (let i = 0; i < thousands.length; i++) {
                const unitValue = Math.pow(1000, i + 1);
                if (num < unitValue) {
                    return convertToWords(Math.floor(num / Math.pow(1000, i))) + " " + thousands[i] + (num % Math.pow(1000, i) !== 0 ? " " + convertToWords(num % Math.pow(1000, i)) : "");
                }
            }
            return "";
        };

        const integerPart = Math.floor(netAmount);
        const decimalPart = Math.round((netAmount - integerPart) * 100);

        let result = convertToWords(integerPart) + " Rand";
        if (decimalPart > 0) {
            result += " and " + convertToWords(decimalPart) + " Cents";
        }

        return result;
    }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Voucher</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            {...register('subject', { required: 'Subject is required' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter subject"
          />
          {errors.subject && (
            <p className="mt-1 text-sm text-red-600">{errors.subject.message}</p>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S/N
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Class
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  QTY
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Price (R)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount (R)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VAT %
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  VAT Amount (R)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Gross Amount (R)
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  WHT%
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  WHT Amount
                </th>
                <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Net Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fields.map((field, index) => {
                const calculated = calculateRow(watchRows[index], index);
                return (
                  <tr key={field.id}>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        {...register(`rows.${index}.class` as const, {
                          required: 'Class is required',
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="text"
                        {...register(`rows.${index}.description` as const, {
                          required: 'Description is required',
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="1"
                        {...register(`rows.${index}.qty` as const, {
                          required: 'Quantity is required',
                          valueAsNumber: true,
                          min: 1,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`rows.${index}.unitPrice` as const, {
                          required: 'Unit price is required',
                          valueAsNumber: true,
                          min: 0,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculated.amount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`rows.${index}.vatPercent` as const, {
                          required: 'VAT % is required',
                          valueAsNumber: true,
                          min: 0,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculated.vatAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculated.grossAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        step="0.01"
                        min="0"
                        {...register(`rows.${index}.whtPercent` as const, {
                          required: 'WHT % is required',
                          valueAsNumber: true,
                          min: 0,
                        })}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculated.whtAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {calculated.netAmount.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan={5} className="px-3 py-4 text-sm font-medium text-gray-900">
                  Total
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {totals.amount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td></td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {totals.vatAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {totals.grossAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td></td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {totals.whtAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
                <td className="px-3 py-4 text-sm text-gray-500">
                  {totals.netAmount.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <button
          type="button"
          onClick={addNewRow}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          + Add another row
        </button>

        <div className="bg-gray-50 p-4 rounded-md">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Net amount in words:
          </label>
          <div className="p-3 bg-white border border-gray-300 rounded-md">
            {/* Function to convert numbers to words would be implemented here */}
            {numberToWords(totals.netAmount)} Rand
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium text-gray-900 mb-3">Beneficiary Payment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="accountName" className="block text-sm font-medium text-gray-700 mb-1">
                Account name
              </label>
              <input
                id="accountName"
                type="text"
                {...register('beneficiary.accountName', { required: 'Account name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter name"
              />
            </div>
            <div>
              <label htmlFor="accountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                Account number
              </label>
              <input
                id="accountNumber"
                type="text"
                {...register('beneficiary.accountNumber', { required: 'Account number is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter number"
              />
            </div>
            <div>
              <label htmlFor="bankName" className="block text-sm font-medium text-gray-700 mb-1">
                Bank name
              </label>
              <input
                id="bankName"
                type="text"
                {...register('beneficiary.bankName', { required: 'Bank name is required' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter bank name"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit Payment Voucher
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentVoucher;