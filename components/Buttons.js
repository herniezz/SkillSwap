import { Button, Group } from '@mantine/core';

export default function Buttons() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <Group position="center" mt="xl">
      <Button onClick={handleClick}>Click me</Button>
      <Button variant="outline" onClick={handleClick}>Outline button</Button>
      <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }} onClick={handleClick}>
        Gradient button
      </Button>
      <Button variant="filled" color="rgba(243, 232, 252, 1)">Button</Button>;
    </Group>
  );
}