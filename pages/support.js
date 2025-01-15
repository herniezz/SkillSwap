import { useState } from 'react';
import { TextInput, Textarea, Button, Container, Title, Text, Stack } from '@mantine/core';

export default function Support() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Tutaj można dodać kod do obsługi wysyłania formularza np. do API
  };

  return (
    <Container size="sm" padding="md" style={{ backgroundColor: '#f8f4f0', padding: '20px', borderRadius: '12px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title order={1} style={{ fontSize: '2.5rem', color: '#333' }}>
          Support Center
        </Title>
        <Text size="lg" color="dimmed">
          Need help or have a question? We're here to assist you.
        </Text>
      </header>

      {submitted ? (
        <Text size="lg" align="center" color="green" style={{ marginBottom: '20px' }}>
          Thank you for reaching out! We'll get back to you soon.
        </Text>
      ) : (
        <form onSubmit={handleSubmit}>
          <Stack spacing="lg">
            <TextInput
              label="Your Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ borderRadius: '8px' }}
            />

            <TextInput
              label="Your Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              style={{ borderRadius: '8px' }}
            />

            <Textarea
              label="Your Message"
              placeholder="How can we help you?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              minRows={4}
              style={{ borderRadius: '8px' }}
            />

            <Button type="submit" variant="filled" style={{ backgroundColor: '#4caf50', color: '#fff' }}>
              Submit
            </Button>
          </Stack>
        </form>
      )}

      <footer style={{ textAlign: 'center', marginTop: '40px', color: '#777' }}>
        <Text>
          You can also reach us via email at <strong>support@skillswap.com</strong> or call us at <strong>+123 456 7890</strong>.
        </Text>
      </footer>
    </Container>
  );
}
