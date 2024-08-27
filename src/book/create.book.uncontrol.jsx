import { Form, Input, InputNumber, Modal, Select, notification } from "antd";
import { useState } from "react";
import {createBookAPI, handleUploadFile} from "../services/api.service.js";

const CreateBookUncontrol = (props) => {
  const {
    isCreateOpen, setIsCreateOpen, loadBook
  } = props;

  const [form] = Form.useForm();

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleSubmitBtn = async (values) => {
    if (!selectedFile) {
      notification.error({
        message: "Error create book",
        description: "Vui lòng upload ảnh thumbnail"
      })
      return;
    }

    //step 1: upload file
    const resUpload = await handleUploadFile(selectedFile, "book");
    if (resUpload.data) {
      //success
      const newThumbnail = resUpload.data.fileUploaded;
      //step 2: create book
      const { mainText, author, price, quantity, category } = values;

      const resBook = await createBookAPI(
          newThumbnail, mainText, author, price, quantity, category
      );

      if (resBook.data) {
        resetAndCloseModal()
        await loadBook();
        notification.success({
          message: "Create book",
          description: "Tạo mới book thành công"
        })

      } else {
        notification.error({
          message: "Error create book",
          description: JSON.stringify(resBook.message)
        })
      }
    } else {
      //failed
      notification.error({
        message: "Error upload file",
        description: JSON.stringify(resUpload.message)
      })
    }
  }

  const resetAndCloseModal = () => {
    form.resetFields();
    setSelectedFile(null);
    setPreview(null);
    setIsCreateOpen(false);
  }

  const handleOnChangeFile = (event) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file))
    }
  }

  return (
      <Modal
          title="Create Book (uncontrolled component)"
          open={isCreateOpen}
          onOk={() => form.submit()}
          onCancel={() => resetAndCloseModal()}
          maskClosable={false}
          okText={"CREATE"}
      >
        <Form
            form={form}
            onFinish={handleSubmitBtn}
            layout="vertical"
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Form.Item
                  label="Tiêu đề"
                  name="mainText"
                  rules={[
                    {
                      required: true,
                      message: 'Tiêu đề không được để trống!',
                    }
                  ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                  label="Tác giả"
                  name="author"
                  rules={[
                    {
                      required: true,
                      message: 'Tác giả không được để trống!',
                    }
                  ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                  label="Giá tiền"
                  name="price"
                  rules={[
                    {
                      required: true,
                      message: 'Giá tiền không được để trống!',
                    }
                  ]}
              >
                <InputNumber
                    style={{ width: "100%" }}
                    addonAfter={' đ'}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item
                  label="Số lượng"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                      message: 'Số lượng không được để trống!',
                    }
                  ]}
              >
                <InputNumber
                    style={{ width: "100%" }}
                />
              </Form.Item>
            </div>

            <div>
              <Form.Item
                  label="Thể loại"
                  name="category"
                  rules={[
                    {
                      required: true,
                      message: 'Thể loại không được để trống!',
                    }
                  ]}
              >
                <Select
                    style={{ width: "100%" }}
                    name="category"
                    options={[
                      { value: 'Arts', label: 'Arts' },
                      { value: 'Business', label: 'Business' },
                      { value: 'Comics', label: 'Comics' },
                      { value: 'Cooking', label: 'Cooking' },
                      { value: 'Entertainment', label: 'Entertainment' },
                      { value: 'History', label: 'History' },
                      { value: 'Music', label: 'Music' },
                      { value: 'Sports', label: 'Sports' },
                      { value: 'Teen', label: 'Teen' },
                      { value: 'Travel', label: 'Travel' },
                    ]}
                />
              </Form.Item>


            </div>
            <div>
              <div>Ảnh thumbnail</div>
              <div>
                <label htmlFor='btnUpload' style={{
                  display: "block",
                  width: "fit-content",
                  marginTop: "15px",
                  padding: "5px 10px",
                  background: "orange",
                  borderRadius: "5px",
                  cursor: "pointer"
                }}>
                  Upload
                </label>
                <input
                    type='file' hidden id='btnUpload'
                    onChange={(event) => handleOnChangeFile(event)}
                    onClick={(event) => event.target.value = null}
                    style={{ display: "none" }}
                />
              </div>
              {preview &&
                  <>
                    <div style={{
                      marginTop: "10px",
                      marginBottom: "15px",
                      height: "100px", width: "150px",
                    }}>
                      <img style={{ height: "100%", width: "100%", objectFit: "contain" }}
                           src={preview} />
                    </div>
                  </>
              }
            </div>

          </div>
        </Form>
      </Modal>
  )
}

export default CreateBookUncontrol;
