import { useRef } from "react"; // استيراد useRef من React لإنشاء مراجع لعناصر الواجهة
import { Button, FormControl, Input, Modal } from "native-base"; // استيراد العناصر الأساسية لبناء واجهة المستخدم من مكتبة native-base
import { useFormik } from "formik"; // استيراد useFormik من مكتبة formik لإدارة حالة النموذج
import * as Yup from "yup"; // استيراد Yup لإجراء التحقق من صحة البيانات
import { updateUser } from "../../libs/requests"; // استيراد دالة updateUser لتحديث بيانات المستخدم
import { useStore } from "../../libs/globalState"; // استيراد useStore للوصول إلى الحالة العالمية وتحديثها

export default function EditUserModal({ modalVisible, closeModal }) {
  // إنشاء مراجع للتركيز على عناصر النموذج عند فتح وإغلاق النافذة
  const initialModalRef = useRef(null);
  const finalModalRef = useRef(null);

  // الحصول على رمز الوصول وبيانات المستخدم من الحالة العالمية
  const { accessToken, user, setUser } = useStore();

  // إعداد useFormik لإدارة حالة النموذج والتحقق من صحة البيانات
  const formik = useFormik({
    initialValues: {
      firstName: user.firstName, // تعيين القيم الأولية للنموذج بناءً على بيانات المستخدم
      lastName: user.lastName,
      status: user.status,
    },
    validationSchema: Yup.object({
      firstName: Yup.string(), // التحقق من صحة اسم المستخدم الأول
      lastName: Yup.string(), // التحقق من صحة اسم المستخدم الأخير
      status: Yup.string(), // التحقق من صحة الحالة
    }),
    async onSubmit(values) {
      // دالة لإرسال بيانات النموذج المحدثة إلى الخادم وتحديث الحالة العالمية
      const user = await updateUser(accessToken, values);
      setUser(user); // تحديث بيانات المستخدم في الحالة العالمية
      closeModal(); // إغلاق النافذة بعد التحديث
    },
  });

  return (
    <Modal
      isOpen={modalVisible} // تحديد ما إذا كانت النافذة مرئية أم لا
      onClose={closeModal} // دالة لإغلاق النافذة
      initialFocusRef={initialModalRef} // تعيين المرجع الأولي للتركيز عليه عند فتح النافذة
      finalFocusRef={finalModalRef} // تعيين المرجع النهائي للتركيز عليه بعد إغلاق النافذة
      avoidKeyboard // تجنب ظهور لوحة المفاتيح فوق المحتوى
    >
      <Modal.Content>
        <Modal.CloseButton /> {/* زر لإغلاق النافذة */}
        <Modal.Header>Edit Profile</Modal.Header> {/* عنوان النافذة */}
        <Modal.Body>
          <FormControl>
            <FormControl.Label>First Name</FormControl.Label>
            <Input
              ref={initialRef} // تعيين المرجع للتركيز على حقل الاسم الأول
              value={formik.values.firstName} // عرض القيمة الحالية لاسم المستخدم الأول
              onChangeText={formik.handleChange("firstName")} // التعامل مع تغييرات النص في حقل الاسم الأول
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Last Name</FormControl.Label>
            <Input
              value={formik.values.lastName} // عرض القيمة الحالية لاسم المستخدم الأخير
              onChangeText={formik.handleChange("lastName")} // التعامل مع تغييرات النص في حقل الاسم الأخير
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Status</FormControl.Label>
            <Input
              value={formik.values.status} // عرض القيمة الحالية للحالة
              onChangeText={formik.handleChange("status")} // التعامل مع تغييرات النص في حقل الحالة
            />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              onPress={closeModal} // إغلاق النافذة عند الضغط على زر "إلغاء"
              bg="#0e806a"
              _hover={{
                bg: "green.700", // تغيير اللون عند التمرير فوق الزر
              }}
            >
              Cancel
            </Button>
            <Button
              onPress={formik.submitForm} // تقديم النموذج عند الضغط على زر "حفظ"
              bg="#0e806a"
              _hover={{
                bg: "green.700", // تغيير اللون عند التمرير فوق الزر
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
