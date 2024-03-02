import { onCleanup, onMount } from 'solid-js';

type Props = {
  botContainer: HTMLDivElement | undefined;
  poweredByTextColor?: string;
  badgeBackgroundColor?: string;
};

const defaultTextColor = '#303235';

export const Badge = (props: Props) => {
  let liteBadge: HTMLAnchorElement | undefined;
  let observer: MutationObserver | undefined;

  const appendBadgeIfNecessary = (mutations: MutationRecord[]) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((removedNode) => {
        if ('id' in removedNode && liteBadge && removedNode.id == 'lite-badge') {
          console.log("Sorry, you can't remove the brand 😅");
          props.botContainer?.append(liteBadge);
        }
      });
    });
  };

  onMount(() => {
    if (!document || !props.botContainer) return;
    observer = new MutationObserver(appendBadgeIfNecessary);
    observer.observe(props.botContainer, {
      subtree: false,
      childList: true,
    });
  });

  onCleanup(() => {
    if (observer) observer.disconnect();
  });

return (
  <span
    style={{
      fontSize: '13px',
      position: 'absolute',
      bottom: 0,
      padding: '10px',
      margin: 'auto',
      width: '100%',
      textAlign: 'center',
      color: props.poweredByTextColor ?? defaultTextColor,
      backgroundColor: props.badgeBackgroundColor ?? '#ffffff',      
    }}
  >
    <button
      onClick={() => window.open('https://eigene-ki.de', '_blank')}
      style={{
        fontSize: '13px',
        margin: '5px',
        fontWeight: 'bold',
        color: '#ffffff',
        backgroundColor: '#3B81F6',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
      }}
    >
    ➔ Hier zur eigenen KI!
    </button>
  </span>
);
};
