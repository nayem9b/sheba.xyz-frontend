"use client";

import { useEffect, useState } from "react";
import ServiceHomeCard from "@/components/ui/ServiceHomeCard";
import ContentsCard from "@/components/ui/ContentsCard";
import { useAllContentsQuery } from "@/redux/api/contentsApi";

const AllContentspage = () => {
  // const [contentsData, setContentsData] = useState<any>();
  // useEffect(() => {
  //   fetch(`http://localhost:8000/api/v1/contents`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data.data);
  //       setContentsData(data.data);
  //     });
  // }, []);

  const { data: contentsData } = useAllContentsQuery({
    refetchOnMountOrArgChange: true,
    pollingInterval: 10000,
  });
  console.log(contentsData);
  return (
    <div>
      {contentsData?.data?.length > 0 ? (
        <div>
          <h1 className="text-center text-blue-500">All Blogs</h1>
          <div className="grid grid-cols-4 mx-60 gap-10">
            {contentsData?.data?.map((content: any) => (
              <ContentsCard key={content.name} content={content} />
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-blue-500 text-center">No contents published</h1>
      )}
    </div>
  );
};

export default AllContentspage;
