import { home } from "@/app/actions";
import { Avatar, Card, Col, Flex, Row, Divider } from "antd";
import { ApplyCard, RankList } from "./components";
import { ChartAreaAxes } from "./components/chart";

export default async function Page() {
  const { data } = await home();
  return (
    <div className="flex flex-col gap-4">
      <Row gutter={16}>
        <Col span={10}>
          <Card title="工会信息" variant="borderless">
            <Flex gap={16}>
              <Avatar src={data?.guildIcon} shape="square" size={120}></Avatar>
              <div className="text-base leading-9">
                工会昵称: {data?.guildName || "--"}
                <br />
                工会ID: {data?.guildId || "--"}
                <br />
                入驻时间: {"补充"}
              </div>
            </Flex>
          </Card>
        </Col>
        <Col span={14}>
          <Card title="待办事项" variant="borderless" className="h-full">
            <ApplyCard data={data || {}}></ApplyCard>
          </Card>
        </Col>
      </Row>
      <Card title="内容数据">
        <div className="grid grid-cols-3">
          <div className="text-center border-r border-solid ">
            <div className="text-base ">今日实时流水(钻石)</div>
            <div className="text-lg font-bold mt-4">{data?.todayTurnover || 0}</div>
          </div>
          <div className="text-center border-r border-solid ">
            <div className="text-base ">本周实时流水(钻石)</div>
            <div className="text-lg font-bold mt-4">{data?.thisWeekTurnover || 0}</div>
          </div>
          <div className="text-center">
            <div className="text-base ">本月实时流水(钻石)</div>
            <div className="text-lg font-bold mt-4">{data?.thisMonthTurnover || 0}</div>
          </div>
        </div>
      </Card>
      <Row gutter={16}>
        <Col span={16}>
          <Card>
            <div className="grid grid-cols-4">
              <div className="text-center border-r border-solid ">
                <div className="text-base ">工会成员(人)</div>
                <div className="text-lg font-bold mt-4">{data?.members || 0}</div>
              </div>
              <div className="text-center border-r border-solid ">
                <div className="text-base ">今日上线(人)</div>
                <div className="text-lg font-bold mt-4">{data?.todayActiveUsers || 0}</div>
              </div>
              <div className="text-center border-r border-solid">
                <div className="text-base ">今日收益(钻石)</div>
                <div className="text-lg font-bold mt-4">{data?.todayIncomeUsers || 0}</div>
              </div>
              <div className="text-center">
                <div className="text-base ">较昨日新增</div>
                <div className="text-lg font-bold mt-4">{data?.todayIncomeUserIncrease || 0}</div>
              </div>
            </div>
            <Divider></Divider>
            <ChartAreaAxes list={data?.lastSevenDaysTurnoverList || []}></ChartAreaAxes>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="今日流水排名" className="h-full">
            <RankList data={data}></RankList>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
