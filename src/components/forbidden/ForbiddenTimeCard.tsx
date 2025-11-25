// components/forbidden/ForbiddenTimeCard.tsx

import React from "react";

export interface ForbiddenItem {
  title: string;
  description: string;
  timeRange: string;
}

const ForbiddenTimeCard: React.FC<{ item: ForbiddenItem }> = ({ item }) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-4 mb-4 border dark:border-gray-700 text-center">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {item.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
        {item.description}
      </p>
      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-2">
        {item.timeRange}
      </p>
    </div>
  );
};

export default ForbiddenTimeCard;
