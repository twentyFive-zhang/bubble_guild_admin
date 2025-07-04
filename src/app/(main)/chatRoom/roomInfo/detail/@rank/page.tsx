"use client";
import { getRoomRankList } from "@/app/actions";
import CommonTable from "@/components/common/table";
import { useSearchParams } from "next/navigation";

export default function Rank() {
  const searchParams = useSearchParams();
  return (
    <CommonTable
      hidePagination
      isHideForm
      isHideFormButton
      hideRowSelection
      rowKey="rank"
      request={getRoomRankList}
      sortParams={(params) => ({ ...params, roomId: Number(searchParams.get("roomId")!) })}
      columns={[
        { title: "排名", dataIndex: "rank" },
        { title: "贡献榜用户昵称", dataIndex: "contributeUser" },
        { title: "贡献榜单值", dataIndex: "contributeValue" },
        { title: "收益榜用户昵称", dataIndex: "receiveUser" },
        { title: "用户榜单值", dataIndex: "receiveValue" },
      ]}></CommonTable>
  );
}
