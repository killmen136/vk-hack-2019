import React from 'react'
import {Panel, PanelHeader, Group, List, Cell, HeaderButton} from "@vkontakte/vkui";

import Icon24Back from '@vkontakte/icons/dist/24/back';

import {BaseComponent} from "../../../base";

const SpeechPartToTitle = {
    nouns: 'Существительные',
    verbs: 'Глаголы',
    adjectives: 'Прилагательные',
    adverbs: 'Наречия'
};

class WordPanel extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: this.props.data
        }
    }

    goBack() {
        this.props.goBack()
    }

    makeTranslationGroup(speechPart, arr) {
        this.log('Generating translation group for ' + speechPart + ' : ' + JSON.stringify(arr));

        return (
            <Group title={SpeechPartToTitle[speechPart]}>
                <List>
                    {arr.map((el) => <Cell>{el}</Cell>)}
                </List>
            </Group>
        );
    }

    render() {
        let translations = this.state.data.translations;
        let possibleSpeechParts = ['nouns', 'verbs', 'adjectives', 'adverbs'];

        return (
            <Panel id='word_panel'>
                <PanelHeader
                    left={<HeaderButton onClick={this.goBack.bind(this)}><Icon24Back/></HeaderButton>}>
                    Слово {this.state.data.word}
                </PanelHeader>
                {
                    possibleSpeechParts.map((p) =>
                        translations[p] ? this.makeTranslationGroup(p, translations[p]) : ''
                    )
                }
            </Panel>);
    }
}

export default WordPanel;