import { useEffect, useState, type ReactNode } from 'react'

type Screen = 'welcome' | 'home' | 'medicine' | 'family' | 'sos' | 'caregiver'
type IconName =
  | 'arrow-left'
  | 'calendar'
  | 'call'
  | 'care'
  | 'check'
  | 'chevron'
  | 'clock'
  | 'close'
  | 'heart'
  | 'home'
  | 'medicine'
  | 'people'
  | 'phone'
  | 'shield'
  | 'spark'
  | 'sos'
  | 'volume'

type Wellness = 'good' | 'okay' | 'help' | null

function useLiveClock() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000)
    return () => window.clearInterval(timer)
  }, [])

  return now
}

function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    'arrow-left': <><path d="m15 18-6-6 6-6" /><path d="M9 12h10" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M16 3v4M8 3v4M3 10h18" /></>,
    call: <path d="M8.6 4.5 10.3 8a2 2 0 0 1-.4 2.3l-1.2 1.2a15 15 0 0 0 3.8 3.8l1.2-1.2a2 2 0 0 1 2.3-.4l3.5 1.7a2 2 0 0 1 1 2.4l-.5 2a2 2 0 0 1-2 1.5C9.6 20.4 3.6 14.4 2.7 6a2 2 0 0 1 1.5-2l2-.5a2 2 0 0 1 2.4 1Z" />,
    care: <><path d="M4 13.5V21h16v-7.5" /><path d="m2 12 10-9 10 9M9 21v-6h6v6" /></>,
    check: <path d="m5 12 4.5 4.5L19 7" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    heart: <path d="M20.8 5.8a5.5 5.5 0 0 0-7.8 0L12 6.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 22l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z" />,
    home: <><path d="m3 11 9-8 9 8" /><path d="M5 10v11h14V10M9 21v-7h6v7" /></>,
    medicine: <><path d="M10.6 5.4a4 4 0 0 1 5.7 5.7l-5.2 5.2a4 4 0 0 1-5.7-5.7Z" /><path d="m8 8 5.7 5.7" /></>,
    people: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20v-2a6 6 0 0 1 12 0v2M15 15a5 5 0 0 1 6 4.9" /></>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 18h4" /></>,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-5" /></>,
    spark: <><path d="m12 3 1.2 4.3L17 9l-3.8 1.7L12 15l-1.2-4.3L7 9l3.8-1.7Z" /><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7Z" /></>,
    sos: <><path d="M12 3 2.8 19h18.4Z" /><path d="M12 9v4M12 16h.01" /></>,
    volume: <><path d="M11 5 6 9H3v6h3l5 4Z" /><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

function AppButton({
  children,
  className = '',
  icon,
  onClick,
  variant = 'primary',
}: {
  children: ReactNode
  className?: string
  icon?: IconName
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'quiet'
}) {
  return (
    <button className={`button button--${variant} ${className}`} onClick={onClick} type="button">
      {icon && <Icon name={icon} />}
      <span>{children}</span>
    </button>
  )
}

function TopBar({
  eyebrow,
  onBack,
  title,
}: {
  eyebrow?: string
  onBack?: () => void
  title: string
}) {
  return (
    <header className="topbar">
      {onBack ? (
        <button aria-label="Go back" className="icon-button" onClick={onBack} type="button">
          <Icon name="arrow-left" size={28} />
        </button>
      ) : (
        <div className="brand-mark brand-mark--small" aria-hidden="true">
          <Icon name="spark" size={24} />
        </div>
      )}
      <div className="topbar__copy">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </div>
    </header>
  )
}

const navItems: { label: string; icon: IconName; screen: Screen }[] = [
  { label: 'Home', icon: 'home', screen: 'home' },
  { label: 'Family', icon: 'people', screen: 'family' },
  { label: 'SOS', icon: 'sos', screen: 'sos' },
  { label: 'Care', icon: 'care', screen: 'caregiver' },
]

function BottomNav({
  current,
  navigate,
}: {
  current: Screen
  navigate: (screen: Screen) => void
}) {
  return (
    <nav aria-label="Main navigation" className="bottom-nav">
      {navItems.map((item) => (
        <button
          aria-current={current === item.screen ? 'page' : undefined}
          className={current === item.screen ? 'nav-item nav-item--active' : 'nav-item'}
          key={item.screen}
          onClick={() => navigate(item.screen)}
          type="button"
        >
          <Icon name={item.icon} />
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

function WelcomeScreen({
  largeText,
  onContinue,
  onLargeTextChange,
  onVoiceChange,
  voiceAssist,
}: {
  largeText: boolean
  onContinue: () => void
  onLargeTextChange: (enabled: boolean) => void
  onVoiceChange: (enabled: boolean) => void
  voiceAssist: boolean
}) {
  const [language, setLanguage] = useState('English')

  return (
    <main className="screen welcome-screen">
      <div className="welcome-art" aria-hidden="true">
        <div className="sun-orbit sun-orbit--outer" />
        <div className="sun-orbit sun-orbit--inner" />
        <div className="welcome-sun">
          <Icon name="spark" size={42} />
        </div>
        <span className="leaf leaf--one" />
        <span className="leaf leaf--two" />
      </div>
      <div className="welcome-copy">
        <p className="eyebrow">Welcome to</p>
        <h1>Golden Hours</h1>
        <p className="tagline">Live Independently. Stay Connected. Feel Safe.</p>
      </div>
      <section aria-labelledby="language-title" className="language-panel">
        <h2 id="language-title">Choose your language</h2>
        <div className="language-options">
          {['English', 'తెలుగు'].map((item) => (
            <button
              aria-pressed={language === item}
              className={language === item ? 'language-button language-button--active' : 'language-button'}
              key={item}
              onClick={() => setLanguage(item)}
              type="button"
            >
              <span>{item}</span>
              {language === item && (
                <span className="choice-check">
                  <Icon name="check" size={20} />
                </span>
              )}
            </button>
          ))}
        </div>
      </section>
      <section aria-label="Accessibility preferences" className="setup-controls">
        <div className="setup-control">
          <div>
            <strong>Text size</strong>
            <span>Choose what feels comfortable</span>
          </div>
          <div aria-label="Text size" className="size-selector">
            <button
              aria-pressed={!largeText}
              className={!largeText ? 'size-option size-option--active' : 'size-option'}
              onClick={() => onLargeTextChange(false)}
              type="button"
            >
              A
            </button>
            <button
              aria-label="Large text"
              aria-pressed={largeText}
              className={largeText ? 'size-option size-option--large size-option--active' : 'size-option size-option--large'}
              onClick={() => onLargeTextChange(true)}
              type="button"
            >
              A
            </button>
          </div>
        </div>
        <div className="setup-control">
          <div>
            <strong>Voice assistance</strong>
            <span>Hear helpful prompts aloud</span>
          </div>
          <button
            aria-label="Voice assistance"
            aria-pressed={voiceAssist}
            className={voiceAssist ? 'switch switch--on' : 'switch'}
            onClick={() => onVoiceChange(!voiceAssist)}
            role="switch"
            type="button"
          >
            <span />
          </button>
        </div>
      </section>
      <AppButton className="button--full" icon="chevron" onClick={onContinue}>
        Get Started
      </AppButton>
      <p className="helper-text">You can change these preferences anytime.</p>
    </main>
  )
}

function HomeScreen({
  medicineTaken,
  navigate,
  now = new Date(),
  onWellnessChange = () => undefined,
  wellness = null,
}: {
  medicineTaken: boolean
  navigate: (screen: Screen) => void
  now?: Date
  onWellnessChange?: (wellness: Wellness) => void
  wellness?: Wellness
}) {
  const [showCheckIn, setShowCheckIn] = useState(false)
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning!' : hour < 17 ? 'Good afternoon!' : 'Good evening!'
  const dateLabel = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  }).format(now)
  const timeLabel = new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    hour12: true,
    minute: '2-digit',
  }).format(now)
  const appointmentDate = new Date(now)
  appointmentDate.setDate(now.getDate() + 2)
  const appointmentLabel = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    weekday: 'long',
  }).format(appointmentDate)
  const wellnessCopy = wellness === 'good'
    ? 'Feeling good today'
    : wellness === 'okay'
      ? 'Taking it easy today'
      : wellness === 'help'
        ? 'Would like a family check-in'
        : 'How are you feeling?'

  return (
    <main className="screen content-screen">
      <TopBar eyebrow="Your day at a glance" title={greeting} />

      <section aria-label={`Today is ${dateLabel}. The current time is ${timeLabel}`} className="live-datetime">
        <span className="live-datetime__icon"><Icon name="clock" size={29} /></span>
        <div>
          <p>{dateLabel}</p>
          <strong>{timeLabel}</strong>
        </div>
        <span className="live-badge"><i /> Live</span>
      </section>

      <section className="next-care-card">
        <div className="day-card__top">
          <div>
            <p className="eyebrow">Next medicine</p>
            <h2>{medicineTaken ? 'Morning dose complete' : 'Amlodipine at 8:00 AM'}</h2>
          </div>
          <div className="next-care-icon">
            <Icon name={medicineTaken ? 'check' : 'medicine'} size={30} />
          </div>
        </div>
        <button onClick={() => navigate('medicine')} type="button">
          {medicineTaken ? 'View medicine' : 'View reminder'} <Icon name="chevron" size={22} />
        </button>
      </section>

      <section className="appointment-card">
        <span className="appointment-icon"><Icon name="calendar" size={28} /></span>
        <div>
          <p className="eyebrow">Upcoming appointment</p>
          <h2>Dr. Meera Rao</h2>
          <p>{appointmentLabel} · 10:30 AM</p>
        </div>
      </section>

      <section aria-labelledby="today-title" className="section-block">
        <div className="section-heading">
          <h2 id="today-title">Today’s care</h2>
          <span className="date-chip"><Icon name="calendar" size={20} /> Today</span>
        </div>

        <button className="task-card" onClick={() => navigate('medicine')} type="button">
          <span className={medicineTaken ? 'task-icon task-icon--done' : 'task-icon'}>
            <Icon name={medicineTaken ? 'check' : 'medicine'} size={28} />
          </span>
          <span className="task-card__copy">
            <strong>Morning medicine</strong>
            <span>{medicineTaken ? 'Taken at 8:05 AM' : 'Amlodipine · 1 tablet'}</span>
          </span>
          <span className={medicineTaken ? 'status status--done' : 'status'}>
            {medicineTaken ? 'Done' : '8:00 AM'}
          </span>
          <Icon name="chevron" />
        </button>

        <button className="task-card" onClick={() => setShowCheckIn(true)} type="button">
          <span className={wellness ? 'task-icon task-icon--done' : 'task-icon'}>
            <Icon name={wellness ? 'check' : 'heart'} size={28} />
          </span>
          <span className="task-card__copy">
            <strong>Daily wellness check-in</strong>
            <span>{wellnessCopy}</span>
          </span>
          <span className={wellness ? 'status status--done' : 'status'}>
            {wellness ? 'Done' : 'Check in'}
          </span>
          <Icon name="chevron" />
        </button>

        <div className="task-card task-card--complete">
          <span className="task-icon task-icon--done"><Icon name="check" size={28} /></span>
          <span className="task-card__copy">
            <strong>Gentle walk</strong>
            <span>15 minutes</span>
          </span>
          <span className="status status--done">Done</span>
        </div>
      </section>

      <section aria-labelledby="quick-title" className="section-block">
        <div className="section-heading"><h2 id="quick-title">Quick access</h2></div>
        <div className="quick-grid">
          <button onClick={() => navigate('medicine')} type="button">
            <span className="quick-icon quick-icon--gold"><Icon name="medicine" size={29} /></span>
            <strong>My Medicines</strong>
          </button>
          <button onClick={() => navigate('family')} type="button">
            <span className="quick-icon quick-icon--green"><Icon name="people" size={29} /></span>
            <strong>My Family</strong>
          </button>
          <button className="quick-card--danger" onClick={() => navigate('sos')} type="button">
            <span className="quick-icon quick-icon--red"><Icon name="sos" size={29} /></span>
            <strong>Emergency Help</strong>
          </button>
          <button onClick={() => navigate('caregiver')} type="button">
            <span className="quick-icon quick-icon--blue"><Icon name="care" size={29} /></span>
            <strong>Caregiver View</strong>
          </button>
        </div>
      </section>

      <aside className="daily-tip">
        <span><Icon name="spark" size={25} /></span>
        <p><strong>A gentle reminder</strong>A glass of water and a few deep breaths can be a lovely reset.</p>
      </aside>

      {showCheckIn && (
        <div className="modal-backdrop" role="presentation">
          <section aria-labelledby="wellness-title" aria-modal="true" className="confirm-sheet wellness-sheet" role="dialog">
            <button aria-label="Close wellness check-in" className="icon-button confirm-sheet__close" onClick={() => setShowCheckIn(false)} type="button">
              <Icon name="close" size={28} />
            </button>
            <div className="wellness-icon"><Icon name="heart" size={34} /></div>
            <p className="eyebrow">Daily check-in</p>
            <h2 id="wellness-title">How are you feeling?</h2>
            <p>Choose the answer that feels closest to you.</p>
            <div className="wellness-options">
              {([
                ['good', 'Feeling good', 'Bright and comfortable'],
                ['okay', 'I’m okay', 'Taking things slowly'],
                ['help', 'I need support', 'Ask family to check in'],
              ] as const).map(([value, label, detail]) => (
                <button
                  className={wellness === value ? 'wellness-option wellness-option--selected' : 'wellness-option'}
                  key={value}
                  onClick={() => {
                    onWellnessChange(value)
                    setShowCheckIn(false)
                  }}
                  type="button"
                >
                  <span><Icon name={value === 'help' ? 'people' : value === 'good' ? 'spark' : 'heart'} size={25} /></span>
                  <span><strong>{label}</strong><small>{detail}</small></span>
                  <Icon name="chevron" />
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  )
}

function MedicineScreen({
  isTaken,
  onBack,
  onRemind,
  onTaken,
  reminded,
}: {
  isTaken: boolean
  onBack: () => void
  onRemind: () => void
  onTaken: () => void
  reminded: boolean
}) {
  return (
    <main className="screen content-screen medicine-screen">
      <TopBar onBack={onBack} title="Morning Medicine" />
      <section className="medicine-hero">
        <div className={isTaken ? 'medicine-symbol medicine-symbol--taken' : 'medicine-symbol'}>
          <Icon name={isTaken ? 'check' : 'medicine'} size={52} />
        </div>
        <p className="eyebrow">{isTaken ? 'Completed' : 'It’s time for'}</p>
        <h2>{isTaken ? 'All taken!' : 'Amlodipine'}</h2>
        <p>{isTaken ? 'We shared the update with your caregiver.' : 'For blood pressure'}</p>
      </section>

      <section className="dose-card">
        <div><span>DOSE</span><strong>1 tablet</strong></div>
        <div className="dose-divider" />
        <div><span>TIME</span><strong>8:00 AM</strong></div>
      </section>

      <div className="note-card">
        <Icon name="heart" />
        <p>Take with a glass of water, after breakfast.</p>
      </div>

      <div aria-live="polite" className="medicine-actions">
        {isTaken ? (
          <div className="success-message">
            <span><Icon name="check" size={32} /></span>
            <strong>Marked as taken</strong>
            <p>Great job looking after yourself today.</p>
          </div>
        ) : (
          <>
            <AppButton className="button--full" icon="check" onClick={onTaken}>
              Mark as Taken
            </AppButton>
            <AppButton className="button--full" icon="clock" onClick={onRemind} variant="secondary">
              {reminded ? 'Reminder set for 8:15 AM' : 'Remind Me Later'}
            </AppButton>
          </>
        )}
      </div>
      <p className="helper-text">Never take a double dose. Contact your doctor if you are unsure.</p>
      <AppButton className="button--full back-home-button" icon="home" onClick={onBack} variant="quiet">
        Back to Home
      </AppButton>
    </main>
  )
}

const contacts = [
  {
    image: 'https://images.unsplash.com/photo-1609253919256-74a3b8f1cd5e?auto=format&fit=crop&w=180&h=180&q=85',
    name: 'Ananya Rao',
    role: 'Daughter',
  },
  {
    image: 'https://images.unsplash.com/photo-1733935778961-9474b31259e1?auto=format&fit=crop&w=180&h=180&q=85',
    name: 'Vikram Rao',
    role: 'Son',
  },
  {
    image: 'https://images.unsplash.com/photo-1659352790869-6e5924e43d52?auto=format&fit=crop&w=180&h=180&q=85',
    name: 'Maya Thomas',
    role: 'Caregiver',
  },
]

function FamilyScreen({ onBack }: { onBack: () => void }) {
  const [selectedContact, setSelectedContact] = useState<(typeof contacts)[number] | null>(null)
  const [callConfirmed, setCallConfirmed] = useState(false)

  return (
    <main className="screen content-screen">
      <TopBar eyebrow="Always nearby" onBack={onBack} title="My Family" />
      <p className="page-intro">Choose someone you trust. Calls are simulated in this prototype.</p>

      <section aria-label="Family contacts" className="contact-list">
        {contacts.map((contact) => (
          <article className="contact-card" key={contact.name}>
            <img alt="" className="contact-photo" src={contact.image} />
            <div className="contact-card__copy">
              <h2>{contact.name}</h2>
              <p>{contact.role}</p>
              <span className="available"><i /> Available now</span>
            </div>
            <AppButton
              className="call-button"
              icon="call"
              onClick={() => {
                setSelectedContact(contact)
                setCallConfirmed(false)
              }}
            >
              Call
            </AppButton>
          </article>
        ))}
      </section>

      <AppButton className="button--full back-home-button" icon="home" onClick={onBack} variant="secondary">
        Back to Home
      </AppButton>

      <div className="reassurance-card">
        <span><Icon name="shield" size={28} /></span>
        <p><strong>Your privacy matters</strong>Your calls and health information stay private.</p>
      </div>

      {selectedContact && (
        <div className="modal-backdrop" role="presentation">
          <section aria-labelledby="call-title" aria-modal="true" className="confirm-sheet" role="dialog">
            <button
              aria-label="Close call confirmation"
              className="icon-button confirm-sheet__close"
              onClick={() => setSelectedContact(null)}
              type="button"
            >
              <Icon name="close" size={28} />
            </button>
            <img alt="" className="call-photo" src={selectedContact.image} />
            {callConfirmed ? (
              <>
                <p className="eyebrow">Call preview</p>
                <h2 id="call-title">Ready to call {selectedContact.name}</h2>
                <p>This is a visual prototype. No real call has been placed.</p>
                <AppButton className="button--full" onClick={() => setSelectedContact(null)}>
                  Done
                </AppButton>
              </>
            ) : (
              <>
                <h2 id="call-title">Call {selectedContact.name}?</h2>
                <p>Your {selectedContact.role.toLowerCase()} will appear in the call screen.</p>
                <AppButton className="button--full" icon="call" onClick={() => setCallConfirmed(true)}>
                  Confirm Call
                </AppButton>
                <AppButton className="button--full" onClick={() => setSelectedContact(null)} variant="quiet">
                  Cancel
                </AppButton>
              </>
            )}
          </section>
        </div>
      )}
    </main>
  )
}

function SosScreen({ onBack }: { onBack: () => void }) {
  const [stage, setStage] = useState<'idle' | 'confirm' | 'sent'>('idle')

  return (
    <main className="screen content-screen sos-screen">
      <TopBar eyebrow="Emergency assistance" onBack={onBack} title="Need urgent help?" />
      <div className="sos-content" aria-live="assertive">
        {stage === 'sent' ? (
          <div className="sos-sent">
            <div className="sos-sent__icon"><Icon name="check" size={56} /></div>
            <p className="eyebrow">Prototype confirmation</p>
            <h2>Contact request confirmed</h2>
            <p>This is a visual demonstration only. No real emergency call or message has been placed.</p>
            <div className="location-status"><Icon name="shield" size={22} /><span>No personal data was shared</span></div>
            <AppButton className="button--full" icon="home" onClick={onBack} variant="secondary">
              Back to Home
            </AppButton>
          </div>
        ) : (
          <>
            <div className="sos-ring">
              <Icon name="shield" size={62} />
            </div>
            <h2>Do you need urgent help?</h2>
            <p>Press the button below. We’ll ask you to confirm before sending an alert.</p>
            <button className="sos-button" onClick={() => setStage('confirm')} type="button">
              <span><Icon name="sos" size={38} /></span>
              <strong>PRESS FOR SOS</strong>
              <small>Tap once to start</small>
            </button>
            <div className="sos-info">
              <Icon name="phone" />
              <p><strong>Prototype only</strong>This button demonstrates the emergency contact flow.</p>
            </div>
            <AppButton className="button--full back-home-button" icon="home" onClick={onBack} variant="quiet">
              Back to Home
            </AppButton>
          </>
        )}
      </div>

      {stage === 'confirm' && (
        <div className="modal-backdrop" role="presentation">
          <section aria-describedby="confirm-description" aria-labelledby="confirm-title" aria-modal="true" className="confirm-sheet" role="dialog">
            <button aria-label="Cancel emergency alert" className="icon-button confirm-sheet__close" onClick={() => setStage('idle')} type="button">
              <Icon name="close" size={28} />
            </button>
            <div className="confirm-icon"><Icon name="sos" size={36} /></div>
            <h2 id="confirm-title">Do you want to contact your emergency contact?</h2>
            <p id="confirm-description">This prototype will show a confirmation state. It will not place a real call.</p>
            <AppButton className="button--full" icon="call" onClick={() => setStage('sent')} variant="danger">
              Yes, Contact
            </AppButton>
            <AppButton className="button--full" onClick={() => setStage('idle')} variant="quiet">
              Cancel
            </AppButton>
          </section>
        </div>
      )}
    </main>
  )
}

function CaregiverScreen({
  medicineTaken,
  now = new Date(),
  onBack,
  wellness = null,
}: {
  medicineTaken: boolean
  now?: Date
  onBack: () => void
  wellness?: Wellness
}) {
  const todayLabel = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    weekday: 'long',
  }).format(now)
  const appointmentDate = new Date(now)
  appointmentDate.setDate(now.getDate() + 2)
  const appointmentLabel = new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    weekday: 'long',
  }).format(appointmentDate)
  const checkInCopy = wellness === 'good'
    ? 'Feeling good today'
    : wellness === 'okay'
      ? 'Taking it easy today'
      : wellness === 'help'
        ? 'Would like a family check-in'
        : 'Not completed yet'

  return (
    <main className="screen content-screen">
      <TopBar eyebrow={`${todayLabel} · Sample data`} onBack={onBack} title="Family Care Overview" />
      <section className="care-summary">
        <div className="care-summary__person">
          <div className="contact-avatar contact-avatar--gold">EM</div>
          <div><h2>Evelyn is doing well</h2><p>Last update 10 minutes ago</p></div>
        </div>
        <span className={wellness === 'help' ? 'well-badge well-badge--attention' : 'well-badge'}>
          <i /> {wellness === 'help' ? 'Check in requested' : wellness ? 'Checked in' : 'Awaiting check-in'}
        </span>
      </section>

      <section aria-labelledby="checkins-title" className="section-block">
        <div className="section-heading">
          <h2 id="checkins-title">Daily check-ins</h2>
          <span className="date-chip">Today</span>
        </div>
        <div className="timeline-card">
          <div className="timeline-row">
            <span className={wellness ? 'timeline-icon timeline-icon--done' : 'timeline-icon'}>
              <Icon name={wellness ? 'check' : 'clock'} />
            </span>
            <div><h3>Daily check-in</h3><p>{checkInCopy}</p></div>
            <time>{wellness ? '7:45 AM' : 'Pending'}</time>
          </div>
          <div className="timeline-line" />
          <div className="timeline-row">
            <span className={medicineTaken ? 'timeline-icon timeline-icon--done' : 'timeline-icon'}>
              <Icon name={medicineTaken ? 'check' : 'clock'} />
            </span>
            <div><h3>Morning medicine</h3><p>{medicineTaken ? 'Taken as planned' : 'Waiting for update'}</p></div>
            <time>{medicineTaken ? '8:05 AM' : 'Due 8:00 AM'}</time>
          </div>
          <div className="timeline-line" />
          <div className="timeline-row">
            <span className="timeline-icon timeline-icon--done"><Icon name="check" /></span>
            <div><h3>Gentle walk</h3><p>15 minutes completed</p></div>
            <time>9:20 AM</time>
          </div>
        </div>
      </section>

      <section aria-labelledby="week-title" className="section-block">
        <div className="section-heading"><h2 id="week-title">Care summary</h2><span className="positive-label">Sample</span></div>
        <div className="week-card">
          <div><strong>{medicineTaken ? 'Taken' : 'Due'}</strong><span>Medicine status</span></div>
          <div><strong>7:45</strong><span>Last check-in</span></div>
        </div>
      </section>

      <section className="appointment-card caregiver-appointment">
        <span className="appointment-icon"><Icon name="calendar" size={28} /></span>
        <div>
          <p className="eyebrow">Upcoming appointment</p>
          <h2>Dr. Meera Rao</h2>
          <p>{appointmentLabel} · 10:30 AM</p>
        </div>
      </section>

      <div className="reassurance-card reassurance-card--warm">
        <span><Icon name="heart" size={28} /></span>
        <p><strong>Sample overview</strong>This prototype does not provide real-time monitoring.</p>
      </div>
      <AppButton className="button--full back-home-button" icon="home" onClick={onBack} variant="secondary">
        Back to Home
      </AppButton>
    </main>
  )
}

function ShowcasePhone({
  caption,
  children,
  number,
  onOpen,
  title,
}: {
  caption: string
  children: ReactNode
  number: string
  onOpen: () => void
  title: string
}) {
  return (
    <article className="showcase-phone">
      <button aria-label={`Open ${title} in interactive prototype`} className="showcase-phone__open" onClick={onOpen} type="button">
        <span className="showcase-phone__number">{number}</span>
        <span className="showcase-phone__label">
          <strong>{title}</strong>
          <small>{caption}</small>
        </span>
        <Icon name="chevron" size={22} />
      </button>
      <div className="showcase-phone__stage">
        <div className="showcase-viewport">
          {children}
        </div>
      </div>
    </article>
  )
}

function ShowcaseBoard({
  largeText,
  medicineTaken,
  onLargeTextChange,
  onOpen,
  onVoiceChange,
  voiceAssist,
}: {
  largeText: boolean
  medicineTaken: boolean
  onLargeTextChange: (enabled: boolean) => void
  onOpen: (screen: Screen) => void
  onVoiceChange: (enabled: boolean) => void
  voiceAssist: boolean
}) {
  return (
    <main className="showcase-board">
      <header className="showcase-hero">
        <div className="showcase-brand">
          <span className="showcase-logo"><Icon name="spark" size={30} /></span>
          <span>Golden Hours</span>
        </div>
        <div className="showcase-hero__copy">
          <p className="showcase-kicker">Senior Companion · UI/UX case study</p>
          <h1>Care that feels simple,<br />warm, and human.</h1>
          <p>Live Independently. Stay Connected. Feel Safe.</p>
          <button className="showcase-cta" onClick={() => onOpen('welcome')} type="button">
            Explore interactive prototype <Icon name="chevron" size={24} />
          </button>
        </div>
        <div className="showcase-principles">
          <span>6 connected screens</span>
          <span>Designed for ages 60+</span>
          <span>Accessible by default</span>
        </div>
      </header>

      <section aria-label="Golden Hours mobile screens" className="showcase-grid">
        <ShowcasePhone caption="Comfort-first onboarding" number="01" onOpen={() => onOpen('welcome')} title="Welcome & Setup">
          <WelcomeScreen
            largeText={largeText}
            onContinue={() => onOpen('home')}
            onLargeTextChange={onLargeTextChange}
            onVoiceChange={onVoiceChange}
            voiceAssist={voiceAssist}
          />
        </ShowcasePhone>
        <ShowcasePhone caption="Everything important at a glance" number="02" onOpen={() => onOpen('home')} title="Home Dashboard">
          <HomeScreen medicineTaken={medicineTaken} navigate={onOpen} />
        </ShowcasePhone>
        <ShowcasePhone caption="Clear, reassuring actions" number="03" onOpen={() => onOpen('medicine')} title="Medicine Reminder">
          <MedicineScreen
            isTaken={medicineTaken}
            onBack={() => onOpen('home')}
            onRemind={() => undefined}
            onTaken={() => undefined}
            reminded={false}
          />
        </ShowcasePhone>
        <ShowcasePhone caption="Trusted people, one tap away" number="04" onOpen={() => onOpen('family')} title="My Family">
          <FamilyScreen onBack={() => onOpen('home')} />
        </ShowcasePhone>
        <ShowcasePhone caption="A calm two-step safety flow" number="05" onOpen={() => onOpen('sos')} title="Emergency SOS">
          <SosScreen onBack={() => onOpen('home')} />
        </ShowcasePhone>
        <ShowcasePhone caption="A simple family care summary" number="06" onOpen={() => onOpen('caregiver')} title="Care Overview">
          <CaregiverScreen medicineTaken={medicineTaken} onBack={() => onOpen('home')} />
        </ShowcasePhone>
      </section>

      <footer className="showcase-footer">
        <div><span><Icon name="spark" size={24} /></span><p><strong>Calm by design</strong>Warm colours and generous space</p></div>
        <div><span><Icon name="people" size={24} /></span><p><strong>Easy to understand</strong>Simple words and familiar actions</p></div>
        <div><span><Icon name="shield" size={24} /></span><p><strong>Safety with dignity</strong>Clear confirmations and no false claims</p></div>
        <div><span><Icon name="heart" size={24} /></span><p><strong>Accessible first</strong>18px+ type and 48px+ targets</p></div>
      </footer>
    </main>
  )
}

export default function App() {
  const now = useLiveClock()
  const [screen, setScreen] = useState<Screen>('welcome')
  const [medicineTaken, setMedicineTaken] = useState(false)
  const [reminded, setReminded] = useState(false)
  const [largeText, setLargeText] = useState(false)
  const [voiceAssist, setVoiceAssist] = useState(false)
  const [voiceNotice, setVoiceNotice] = useState('')
  const [wellness, setWellness] = useState<Wellness>(null)

  const showNav = screen !== 'welcome' && screen !== 'medicine'
  const speakCurrentScreen = () => {
    const summaries: Record<Screen, string> = {
      welcome: 'Welcome to Golden Hours. Choose your language and accessibility preferences, then select Get Started.',
      home: `Home dashboard. ${medicineTaken ? 'Your morning medicine is complete.' : 'Amlodipine is due at 8 AM.'} Your next appointment is in two days at 10:30 AM.`,
      medicine: medicineTaken
        ? 'Morning medicine has been marked as taken.'
        : 'Morning medicine reminder. Amlodipine, one tablet, scheduled for 8 AM.',
      family: 'My Family. Choose a trusted contact to preview a call.',
      sos: 'Emergency help. Press the red S O S button, then confirm or cancel. This prototype does not place a real call.',
      caregiver: `Family care overview. Medicine is ${medicineTaken ? 'taken' : 'due'}. Daily check-in is ${wellness ? 'complete' : 'pending'}.`,
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const message = new SpeechSynthesisUtterance(summaries[screen])
      message.rate = 0.85
      message.pitch = 1
      window.speechSynthesis.speak(message)
      setVoiceNotice('Reading this screen aloud')
    } else {
      setVoiceNotice('Voice assistance is not supported on this device')
    }
    window.setTimeout(() => setVoiceNotice(''), 2800)
  }

  return (
    <div className="app-shell">
      <div className={largeText ? 'phone-frame phone-frame--large-text' : 'phone-frame'}>
        {screen === 'welcome' && (
          <WelcomeScreen
            largeText={largeText}
            onContinue={() => setScreen('home')}
            onLargeTextChange={setLargeText}
            onVoiceChange={setVoiceAssist}
            voiceAssist={voiceAssist}
          />
        )}
        {screen === 'home' && (
          <HomeScreen
            medicineTaken={medicineTaken}
            navigate={setScreen}
            now={now}
            onWellnessChange={setWellness}
            wellness={wellness}
          />
        )}
        {screen === 'medicine' && (
          <MedicineScreen
            isTaken={medicineTaken}
            onBack={() => setScreen('home')}
            onRemind={() => setReminded(true)}
            onTaken={() => setMedicineTaken(true)}
            reminded={reminded}
          />
        )}
        {screen === 'family' && <FamilyScreen onBack={() => setScreen('home')} />}
        {screen === 'sos' && <SosScreen onBack={() => setScreen('home')} />}
        {screen === 'caregiver' && (
          <CaregiverScreen
            medicineTaken={medicineTaken}
            now={now}
            onBack={() => setScreen('home')}
            wellness={wellness}
          />
        )}
        {voiceAssist && screen !== 'welcome' && (
          <button aria-label="Read this screen aloud" className="voice-tool" onClick={speakCurrentScreen} type="button">
            <Icon name="volume" size={27} />
            <span>Listen</span>
          </button>
        )}
        {voiceNotice && <div aria-live="polite" className="voice-toast">{voiceNotice}</div>}
        {showNav && <BottomNav current={screen} navigate={setScreen} />}
      </div>
    </div>
  )
}
