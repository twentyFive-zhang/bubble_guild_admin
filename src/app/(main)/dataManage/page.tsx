import { Row, Col, Card, Divider } from "antd";
import { RankList, TimeCard } from "./components";
import { ChartAreaAxes } from "../dashboard/components/chart";
import { getMonthStat } from "@/app/actions";

export default async function Page() {
  const { data } = await getMonthStat();
  return (
    <div className="flex flex-col gap-4">
      <TimeCard></TimeCard>
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <div className="grid grid-cols-4">
              <div className="text-center border-r border-solid ">
                <div className="text-base ">工会成员(人)</div>
                <div className="text-lg font-bold mt-4">{data?.members || 0}</div>
              </div>
              <div className="text-center border-r border-solid ">
                <div className="text-base ">本月新增成员(人)</div>
                <div className="text-lg font-bold mt-4">{data?.thisMonthNewMembers || 0}</div>
              </div>
              <div className="text-center border-r border-solid">
                <div className="text-base ">本月退出成员(人)</div>
                <div className="text-lg font-bold mt-4">{data?.thisMonthLeaveMembers || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-base ">本月有效开播房间(个)</div>
                <div className="text-lg font-bold mt-4">{data?.activeRoomCount || 0}</div>
              </div>
            </div>
            <Divider></Divider>
            <ChartAreaAxes description="近30日" list={data?.turnoverList || []}></ChartAreaAxes>
          </Card>
        </Col>
        <Col span={8}>
          <RankList data={data}></RankList>
        </Col>
      </Row>
    </div>
  );
}
