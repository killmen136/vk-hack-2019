import * as React from "react";
import {Cell, ScreenSpinner, View} from "@vkontakte/vkui";

import {BaseComponent} from "../../base"
import PacksListPanel from "./panels/pack-list";
import PackPanel from "./panels/pack";
import WordPanel from "./panels/pack-word";


class PackView extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            activePanel: 'pack_list_panel',
            history: ['pack_list_panel'],

            chosenPack: null,
            chosenWord: null,

            popout: null
        }
    }

    /* nav */
    goBack() {
        const history = [...this.state.history];
        history.pop();
        const activePanel = history[history.length - 1];
        this.setState({ history, activePanel });
    }

    goForward(activePanel) {
        const history = [...this.state.history];
        history.push(activePanel);
        this.setState({ history, activePanel });
    }
    /* end */

    onPackClick(pack) {
        this.log('PackView: changing panel for pack = ' + JSON.stringify(pack));

        this.setState({
            chosenPack: pack
        });
        this.goForward('pack_panel');
    }

    onWordClicked(w) {
        this.log('PackView: changing panel for pack = ' + JSON.stringify(w));

        this.setState({
            chosenWord: w
        });
        this.goForward('pack_word_panel');
    }

    setPopout(flag) {
        this.log('PackView: showing');

        this.setState({
            popout: flag ? <ScreenSpinner/> : null
        });
    }

    render() {
        return (
            <View id='pack_view' activePanel={this.state.activePanel} popout={this.state.popout}>
                <PacksListPanel
                    id='pack_list_panel'
                    onPackClick={this.onPackClick.bind(this)}
                    setPopout={this.setPopout.bind(this)}
                />
                <PackPanel
                    id='pack_panel'
                    onWordClicked={this.onWordClicked.bind(this)}
                    goBack={this.goBack.bind(this)}
                    pack={this.state.chosenPack}
                    setPopout={this.setPopout.bind(this)}
                />
                <WordPanel
                    id='pack_word_panel'
                    data={this.state.chosenWord}
                    goBack={this.goBack.bind(this)}
                />
            </View>
        )
    }
}

export default PackView;