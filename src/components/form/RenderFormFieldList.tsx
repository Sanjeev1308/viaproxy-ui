import { RenderFormField } from './RenderFormField';

/* eslint-disable @typescript-eslint/no-explicit-any */
const calculateColumnSpan = (fieldGroup: any[]) => {
  const totalFields = fieldGroup.length;

  // Predefined column span mapping
  const columnSpanMap: { [key: number]: string } = {
    1: 'col-span-12',
    2: 'col-span-6',
    3: 'col-span-4',
    4: 'col-span-3',
  };

  // Return mapped column span or default to full width if not in map
  return columnSpanMap[totalFields] || 'col-span-12';
};

export default function RenderFormFieldList({
  fieldArray,
  form,
}: {
  fieldArray: any;
  form: any;
}) {
  return (
    <div className="flex flex-col gap-1">
      {fieldArray.map((field: any, index: any) =>
        Array.isArray(field) ? (
          <div key={index} className="grid grid-cols-12 gap-4">
            {field.map((item) => (
              <div key={item.name} className={calculateColumnSpan(field)}>
                <RenderFormField field={item} form={form} />
              </div>
            ))}
          </div>
        ) : (
          <RenderFormField key={field.name} field={field} form={form} />
        )
      )}
    </div>
  );
}
