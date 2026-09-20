import { createRoot } from 'react-dom/client';
import { GameSession } from '../../src/game-session.js';
import { FishingGame, fishingGame } from './index.js';
import './embedded.css';

createRoot(document.getElementById('root')!).render(
  <GameSession definition={fishingGame}>{props => <FishingGame {...props} />}</GameSession>,
);
