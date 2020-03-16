import choo from 'choo';
import './main.css';
import layouts from './ui/layouts';
import mainView from './ui/mainView';
import controller from './controller';

var app = choo({ hash: true });
app.use(controller);
app.route('/', layouts(mainView));
app.mount('body');
