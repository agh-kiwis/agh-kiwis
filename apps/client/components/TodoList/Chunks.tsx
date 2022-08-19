import { Chunk } from './Chunk';

export const Chunks = (props) => {
  return (
    <>
      {props.chunks.map((chunk, key) => (
        <Chunk key={key} index={key} chunk={chunk} timeInterval={props.timeInterval}></Chunk>
      ))}
    </>
  )
};

