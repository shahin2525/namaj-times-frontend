// components/forbidden/ForbiddenTimeList.tsx

import ForbiddenTimeCard, { ForbiddenItem } from "./ForbiddenTimeCard";

const ForbiddenTimeList = ({ list }: { list: ForbiddenItem[] }) => {
  return (
    <div>
      {list.map((item, index) => (
        <ForbiddenTimeCard key={index} item={item} />
      ))}
    </div>
  );
};

export default ForbiddenTimeList;
