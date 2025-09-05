import SignupForm from './signup-form'

export default function Page() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
      <h1>Sign Up</h1>
      <SignupForm />
    </main>
  )
}
