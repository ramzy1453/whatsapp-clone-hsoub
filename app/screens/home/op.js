import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native"; // استيراد مكونات من مكتبة React Native
import { Button } from "native-base"; // استيراد زر من مكتبة Native Base
import { useStore } from "../../libs/globalState"; // استيراد الدوال والمتحولات من الحالة العامة
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"; // استيراد مكون لتحريك الشاشة عند ظهور لوحة المفاتيح

export default function Profile() {
  const { user } = useStore(); // استخراج بيانات المستخدم ورمز الوصول من الحالة العامة
  const { lastName, firstName, email, profilePicture, status } = user; // استخراج معلومات المستخدم من المتحول user
  const actualStatus = status || "No status"; // إذا لم يكن هناك حالة، استخدام "No status" كقيمة افتراضية

  return (
    <KeyboardAwareScrollView style={styles.container}>
      {/* مكون لجعل الشاشة قابلة للتمرير */}
      <View style={styles.imageContainer}>
        {/* حاوية لعرض صورة الملف الشخصي */}
        <TouchableOpacity>
          {/* عنصر قابل للضغط لتحديث صورة الملف الشخصي */}
          <Image
            source={{ uri: profilePicture }}
            style={styles.profilePicture}
          />
          {/* عرض صورة الملف الشخصي */}
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        {/* حاوية لعرض المعلومات الشخصية */}
        <View style={styles.labelContainer}>
          {/* حاوية لتسمية الحقول */}
          <Text style={styles.label}>First Name</Text>
          {/* تسمية حقل الاسم الأول */}
          <Text style={styles.label}>Email</Text>
          {/* تسمية حقل البريد الإلكتروني */}
          <Text style={styles.label}>Status</Text> {/* تسمية حقل الحالة */}
        </View>
        <View style={styles.textContainer}>
          {/* حاوية لعرض البيانات الشخصية */}
          <Text style={styles.text}>
            {firstName} {lastName} {/* عرض الاسم الأول واسم العائلة */}
          </Text>
          <Text style={styles.text}>{email}</Text> {/* عرض البريد الإلكتروني */}
          <Text style={styles.text}>{actualStatus}</Text> {/* عرض الحالة */}
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {/* حاوية لزر تعديل الملف الشخصي */}
        <Button
          bg="#0e806a" // تحديد لون خلفية الزر
          _hover={{
            bg: "green.700", // تغيير لون الخلفية عند التمرير فوق الزر
          }}
        >
          Edit Profile {/* نص الزر: تعديل الملف الشخصي */}
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50, // تحديد مسافة من الأعلى
  },
  imageContainer: {
    alignItems: "center", // توسيط صورة الملف الشخصي
  },
  profilePicture: {
    width: 150, // عرض الصورة
    height: 150, // ارتفاع الصورة
    borderRadius: 1000, // جعل الصورة دائرية الشكل
  },
  subContainer: {
    marginTop: 40, // مسافة من الأعلى
    display: "flex",
    flexDirection: "row", // عرض العناصر بجانب بعضها أفقياً
    paddingHorizontal: 20, // تحديد مسافة أفقية داخل الحاوية
  },
  labelContainer: {
    flex: 1, // توزيع المساحة بين الحاويات بالتساوي
  },
  textContainer: {
    flex: 1, // توزيع المساحة بين الحاويات بالتساوي
  },

  text: {
    fontSize: 20, // حجم النص
    fontWeight: "bold", // جعل النص غامق
    marginVertical: 10, // مسافة عمودية داخل الحاوية
  },

  label: {
    fontSize: 20, // حجم تسمية الحقل
    marginVertical: 10, // مسافة عمودية داخل الحاوية
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20, // تحديد مسافة أفقية داخل حاوية الزر
    paddingVertical: 40, // تحديد مسافة عمودية داخل حاوية الزر
  },
});
