User:
"Where is my shipment 123456789?"

                 │
                 ▼
        ┌─────────────────┐
        │ Analyze Request │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Classify Query  │
        └────────┬────────┘
                 │
       ┌─────────┼──────────┐
       ▼         ▼          ▼
   Shipment    Account    General
       │         │          │
       ▼         ▼          ▼
 Shipment API  Account    Knowledge
               API         Search
       │         │          │
       └─────────┼──────────┘
                 ▼
        ┌─────────────────┐
        │ Generate Answer │
        └────────┬────────┘
                 ▼
              END