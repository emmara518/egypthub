# EgyptHub AI Concierge Architecture

## AI Information Architecture

### Structure
```
/ai                          AI Home — lightweight landing with quick actions
├── /ai/chat                 Full chat interface (like ChatGPT)
├── /ai/planner              5-step trip wizard (city → days → travelers → budget → interests)
├── /ai/recommendations      Smart recommendations by category
├── /ai/voice                Voice interaction mode
├── /ai/history              Past trips + saved plans + conversations
└── /ai/profile              User preferences (language, budget, trip type, food)
```

### Route Map
| Route | Purpose | State | Auth |
|---|---|---|---|
| `/ai` | AI Home — welcome + quick actions | ✅ | Optional |
| `/ai/chat` | Full AI chat | ✅ | Optional |
| `/ai/planner` | Trip creation wizard | ✅ | Optional |
| `/ai/recommendations` | Smart recommendations | ✅ | Optional |
| `/ai/voice` | Voice interaction | ✅ | Optional |
| `/ai/history` | Past trips + conversations | ✅ | Optional |
| `/ai/profile` | User preferences | ✅ | Optional |
| `/ai-concierge` | **Redirects → `/ai`** | ✅ | - |

### Component Tree
```
AILayout (Bottom Nav)
├── AIHomePage
│   ├── QuickActions (plan, voice, recommendations, history)
│   ├── ChatPreview (suggestions)
│   └── TripTypeCards (family, budget, adventure, luxury)
├── AIChatPage
│   ├── ChatHeader
│   ├── MessageList
│   │   ├── UserMessage
│   │   └── ZainabMessage
│   ├── TypingIndicator
│   └── ChatInput
│       ├── TextInput
│       ├── VoiceButton
│       └── SendButton
├── AIPlannerPage
│   ├── StepProgress (5 steps)
│   ├── StepCity (choose city)
│   ├── StepDays (choose duration)
│   ├── StepTravelers (choose group size)
│   ├── StepBudget (choose budget)
│   ├── StepInterests (choose interests)
│   └── CreateButton
├── AIRecommendationsPage
│   ├── CategoryFilter
│   └── RecommendationCard[]
├── AIVoicePage
│   ├── MicButton
│   ├── TranscriptDisplay
│   └── ResponseDisplay
├── AIHistoryPage
│   ├── TabBar (trips | plans)
│   └── TripCard[]
└── AIProfilePage
    ├── LanguageSelector
    ├── TripTypeSelector
    ├── BudgetSelector
    └── FoodSelector
```

### Data Flow
```
User Input → /api/ai-concierge/chat → Zainab Engine (LLM or Rule-based)
                                          ↓
                              Response → UI → User
```

### Navigation (Bottom Nav)
- Fixed bottom bar with 6 items: Home, Chat, Planner, Voice, Trips, Profile
- Active state highlighted with gold accent
- Back navigation via `HiChevronLeft` links

### Design System Compliance
- All pages use theme CSS variables (no hardcoded hex)
- Dark luxury background (`bg-theme-bg`)
- Gold borders (`border-theme-gold/20`)
- Gold buttons (`bg-theme-gold text-dark-900`)
- Consistent radius (`rounded-2xl` for cards, `rounded-xl` for buttons)
- Typography: `font-playfair` for headings, `font-cairo` for body
