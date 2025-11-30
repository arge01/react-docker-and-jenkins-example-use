import Form from '@components/Forms';

export default function MultiDataModal() {
  const onSubmit = (values: any) => {
    console.log('values: ', values);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Text
        field={'multidata'}
        defaultValue={'default value'}
        required={false}
      />
    </Form>
  );
}
