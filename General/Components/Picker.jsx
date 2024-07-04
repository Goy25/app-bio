import { useEffect, useState } from "react";
import Button from "./Button";
import ChooseItem from "./ChooseItem";

export default function Picker({
  handleChange,
  items,
  placeholder = "Seleccionar",
  placeholderValue = 0,
  style,
  value,
  width = "100%",
}) {
  const [label, setLabel] = useState(placeholder);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (items.length === 0) return;
    const selectedItem = items.find((item) => item.value === value);
    if (selectedItem !== undefined) {
      setLabel(selectedItem.label);
    } else {
      handleChange(placeholderValue);
      setLabel(placeholder);
    }
  }, [items, value]);

  return (
    <>
      <Button
        onPress={() => setShow(true)}
        text={label}
        style={style}
        width={width}
      />
      <ChooseItem
        handleChange={handleChange}
        items={items}
        placeholder={{
          text: placeholder,
          onPress: () => {
            handleChange(placeholderValue);
            setShow(false);
          },
        }}
        show={show}
        setShow={setShow}
      />
    </>
  );
}
