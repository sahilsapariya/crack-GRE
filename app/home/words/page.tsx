"use client";

import { useEffect, useState } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { getData } from "@/actions/api";

export default function DemoPage() {
  const [words, setWords] = useState(null);

  useEffect(() => {
    const fetchWords = async () => {
      const res = await getData("/api/v1/words");
      setWords(res.data[0].words);
    };
    fetchWords();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Words</h1>
      </div>
      <div className="flex justify-center rounded-lg overflow-x-hidden">
        <div className="container p-0 ">
          {words && <DataTable columns={columns} data={words} />}
        </div>
      </div>
    </>
  );
}
