import { useEffect, useState } from "react";
import PopUp from "../../components/PopUp";
import classNames from "classnames";
import styles from './VizualizarSolicitacaoProducao.module.scss';
import BotaoPreenchido from "../../components/Botoes/BotaoPreenchido";
import { AcaoProducao } from "../../components/ItemLista/Acoes";
import AlterarStatusProducao from "../AlterarStatusProducao";
import ConfirmarArquivamentoSolicitacao from "../ConfirmarArquivamentoSolicitacao";
import ConfirmarExclusaoSolicitacao from "../ConfirmarExclusaoSolicitacao";
import { SolicitacaoProps } from "../../types";
import Solicitacoes from "../../services/Solicitacoes";

interface Props {
  aberto: boolean;
  onClose: () => void;
  usuario: 'adm' | 'solicitante';
  idSolic: number;
}

export default function VizualizarSolicitacaoProducao(props: Props) {
  const [solicitacao, setSolicitacao] = useState({} as SolicitacaoProps);

  const [titulo, setTitulo] = useState('exemplo');
  const [tipo, setTipo] = useState('Feature');
  const [status, setStatus] = useState<"new" | "on-holding" | "done">('on-holding');
  const [desc, setDesc] = useState('lorem ipsum');

  const [popupAlterar, setPopupAlterar] = useState(false);
  const [popupArquivar, setPopupArquivar] = useState(false);
  const [popupExclusao, setPopupExclusao] = useState(false);

  const producaoMask = {
    'New': 'new',
    'On Holding': 'on-holding',
    'Done': 'done'
}

  useEffect(() => {
    if (props.idSolic) {
      Solicitacoes.getByID(props.idSolic).then(data => {
        setSolicitacao(data);
      });
    }
  }, [props.idSolic]);
  return (
    <PopUp
      titulo={`${solicitacao.tipo} ${solicitacao.titulo}`}
      visivel={props.aberto}
      onClose={props.onClose} >
      <div className={styles.form}>
        <div className={styles.inputs}>
          <div
            className={classNames({
              [styles.input]: true,
              [styles.preencher]: true
            })}
          >
            <span className={styles.label}>Descrição</span>

            <span className={styles.conteudo}>
              {solicitacao.descricao}
            </span>
            <span className={styles.label}>Arquivos</span>
            <span className={styles.arquivos}>
              {solicitacao.attachments && solicitacao.attachments.map(arquivo => (
                <BotaoPreenchido
                  key={arquivo.id}
                  className={styles.arquivo}
                  handleClick={() => window.open(`http://localhost:3001${arquivo.url}`, '_blank')}>
                  {arquivo.fileName}
                </BotaoPreenchido>
              ))}
            </span>
            <div className={styles.subtitulo}>
            <div>
                Criado em {new Date(solicitacao.data_criacao).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
              </div>
              {solicitacao.data_edicao && <div>
                Editado em {new Date(solicitacao.data_edicao).toLocaleDateString('pt-br', {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false
                })}
              </div>}
            </div>
            <div className={styles.producao}>
              <span className={styles.label}>Status de produção</span>
              {solicitacao.status && <span className={styles['producao-status']}>
                <AcaoProducao status={producaoMask[solicitacao.status.split('.')[1]]} />
              </span>}
            </div>
            <div className={styles['linha-submit']}>
              {props.usuario == 'adm' && <>
                <BotaoPreenchido
                  className={styles.botao}
                  handleClick={() => setPopupArquivar(true)}>
                  Arquivar
                </BotaoPreenchido>
                <BotaoPreenchido
                  className={styles.botao}
                  handleClick={() => setPopupExclusao(true)}>
                  Excluir
                </BotaoPreenchido>
                <BotaoPreenchido
                  className={styles.botao}
                  handleClick={() => setPopupAlterar(true)}>
                  Alterar status produção
                </BotaoPreenchido>
              </>}
            </div>
          </div>
        </div>
      </div>
      <AlterarStatusProducao aberto={popupAlterar} onClose={() => setPopupAlterar(false)} />
      <ConfirmarArquivamentoSolicitacao idSolic={solicitacao.id} aberto={popupArquivar} onClose={() => setPopupArquivar(false)} />
      <ConfirmarExclusaoSolicitacao idSolic={solicitacao.id} aberto={popupExclusao} onClose={() => setPopupExclusao(false)} />
    </PopUp>
  )
}