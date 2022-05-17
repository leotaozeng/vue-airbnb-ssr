import { userSignInAPI, userSignUpAPI } from '@/api/auth';
import { useAuthStore } from '@/stores/auth';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { reactive, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

interface IRuleForm {
  phone: string;
  password: string;
}

interface IResult {
  activeName: Ref<string>;
  ruleFormRef: Ref<FormInstance | undefined>;
  ruleForm: IRuleForm;
  rules: FormRules;
  handleSubmitForm: (formEl: FormInstance | undefined) => Promise<void>;
  handleResetForm: (formEl: FormInstance | undefined) => void;
}

export default function useForm(): IResult {
  const { t } = useI18n();
  const authStore = useAuthStore();
  const router = useRouter();

  const activeName = ref<string>('signin');
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive<IRuleForm>({ phone: '', password: '' });
  const rules = reactive<FormRules>({
    phone: [
      {
        required: true,
        message: t('require', { name: t('auth.phone') }),
        trigger: 'blur'
      },
      {
        min: 11,
        max: 11,
        message: '请输入正确的手机号码',
        trigger: 'blur'
      }
    ],
    password: [
      {
        required: true,
        message: t('require', { name: t('auth.password') }),
        trigger: 'blur'
      }
    ]
  });

  async function handleSubmitForm(formEl: FormInstance | undefined) {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        const response =
          activeName.value === 'signup'
            ? await userSignUpAPI(ruleForm)
            : await userSignInAPI(ruleForm);

        if (response && response.success && response.result) {
          const { message, result } = response;
          const { status } = result;

          authStore.setLoggedIn(status);
          ElMessage({
            message,
            type: 'success',
            showClose: true
          });

          router.push({ name: 'Home' });
          return;
        }

        if (response && !response.success) {
          ElMessage({
            showClose: true,
            message: response.message,
            type: 'error'
          });
        }
      } else {
        console.error('Error submit', fields);
      }
    });
  }

  function handleResetForm(formEl: FormInstance | undefined) {
    if (!formEl) return;
    formEl.resetFields();
    console.log('reset!');
  }

  return {
    activeName,
    ruleFormRef,
    ruleForm,
    rules,
    handleSubmitForm,
    handleResetForm
  };
}
