import { Result } from "antd";
export const PageNotFound = () => {
  return (
    <Result
      status="error"
      title="Không tìm thấy kết quả nào"
      subTitle="Hãy thử sử dụng các từ khóa chung chung hơn"
    />
  );
};
