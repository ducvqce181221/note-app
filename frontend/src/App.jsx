import { Flex, Spin } from "antd"
import Home from "./pages/Home/home"
import { LoadingOutlined } from "@ant-design/icons"
import { useState } from "react"

const App = () => {

  const [isLoadingSpin, setIsLoadingSpin] = useState(false);

  return (
    <>

      <Flex vertical>
        <Spin
          spinning={isLoadingSpin}
          indicator={<LoadingOutlined style={{ fontSize: 48 }} />}
        >
          <Home
            setIsLoadingSpin={setIsLoadingSpin}
          />
        </Spin>
      </Flex>

    </>
  )
}

export default App
