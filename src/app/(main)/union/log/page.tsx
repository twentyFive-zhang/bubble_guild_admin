import CommonTable from "@/components/common/table";
import { getLogPage } from "@/app/actions";
import { Search } from "./components/main";
export default async function Page() {
  return (
    <div>
      <CommonTable
        hideRowSelection
        rowKey={"createTimeStr"}
        request={getLogPage}
        columns={[
          { dataIndex: "userId", title: "用户ID" },
          { dataIndex: "nickname", title: "用户昵称" },
          { dataIndex: "urlName", title: "操作类型" },
          { dataIndex: "operateNickname", title: "操作人" },
          { dataIndex: "createTimeStr", title: "操作时间" },
        ]}
        formChildren={<Search></Search>}></CommonTable>
    </div>
  );
}
