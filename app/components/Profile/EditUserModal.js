import { useRef } from "react";
import { Button, FormControl, Input, Modal } from "native-base";
import { useFormik } from "formik";
import * as Yup from "yup";
import { updateUser } from "../../libs/requests";
import { useStore } from "../../libs/globalState";

export default function EditUserModal({ modalVisible, closeModal }) {
  const initialModalRef = useRef(null);
  const finalModalRef = useRef(null);
  const { accessToken, user, setUser } = useStore();

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      status: user.status,
    },
    validationSchema: Yup.object({
      firstName: Yup.string(),
      lastName: Yup.string(),
      status: Yup.string(),
    }),
    async onSubmit(values) {
      const user = await updateUser(accessToken, values);
      setUser(user);
      closeModal();
    },
  });

  return (
    <Modal
      isOpen={modalVisible}
      onClose={closeModal}
      initialFocusRef={initialModalRef}
      finalFocusRef={finalModalRef}
      avoidKeyboard
    >
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Edit Profile</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              ref={initialRef}
              value={formik.values.firstName}
              onChangeText={formik.handleChange("firstName")}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              value={formik.values.lastName}
              onChangeText={formik.handleChange("lastName")}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Status</FormControl.Label>
            <Input
              value={formik.values.status}
              onChangeText={formik.handleChange("status")}
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              onPress={closeModal}
              bg="#0e806a"
              _hover={{
                bg: "green.700",
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={formik.submitForm}
              bg="#0e806a"
              _hover={{
                bg: "green.700",
              }}
            >
              Save
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
