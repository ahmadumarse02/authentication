"use client";

import { useForm } from "react-hook-form";

type MemoFormData = {
  title: string;
  sendTo: string;
  cc1: string;
  cc1Action: string;
  date: string;
  body: string;
  attachment: FileList | null;
};

function MemoForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MemoFormData>();

  const onSubmit = (data: MemoFormData) => {
    console.log("Memo submitted:", data);
    // Handle form submission
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Memo</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Memo title
            </label>
            <input
              id="title"
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="sendTo"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Send to
            </label>
            <select
              id="sendTo"
              {...register("sendTo", { required: "Recipient is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select option</option>
              <option value="department1">Department 1</option>
              <option value="department2">Department 2</option>
            </select>
            {errors.sendTo && (
              <p className="mt-1 text-sm text-red-600">
                {errors.sendTo.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="cc1"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CC1
            </label>
            <select
              id="cc1"
              {...register("cc1")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select option</option>
              <option value="manager1">Manager 1</option>
              <option value="manager2">Manager 2</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="cc1Action"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              CC 1 action
            </label>
            <select
              id="cc1Action"
              {...register("cc1Action")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select option</option>
              <option value="approval">Approval</option>
              <option value="review">Review</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Date
          </label>
          <input
            id="date"
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Memo body
          </label>
          <textarea
            id="body"
            rows={4}
            {...register("body", { required: "Memo body is required" })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter memo body"
          />
          {errors.body && (
            <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="attachment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Attachment
          </label>
          <input
            id="attachment"
            type="file"
            {...register("attachment")}
            className="w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send Memo
          </button>
        </div>
      </form>
    </div>
  );
}

export default MemoForm;
