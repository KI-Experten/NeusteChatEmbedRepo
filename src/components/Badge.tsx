import { onCleanup, onMount } from 'solid-js';

type Props = {
  botContainer: HTMLDivElement | undefined;
  poweredByTextColor?: string; // Optional property für Textfarbe
  badgeBackgroundColor?: string; // Optional property für Hintergrundfarbe
};

const defaultTextColor = '#303235'; // Standard-Textfarbe

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
      class="w-full text-center px-[10px] pt-[6px] pb-[10px] m-auto text-[13px]"
      style={{
        color: props.poweredByTextColor ?? defaultTextColor,
        backgroundColor: props.badgeBackgroundColor ?? '#ffffff', // Verwende CamelCase für Stilregeln
      }}
    >
      <button
        onClick={() => window.open('https://eigene-ki.de', '_blank')}
        style={{
          fontSize: '13px',
          fontWeight: 'bold',
          color: 'white', // Weiße Textfarbe für den Button
          backgroundColor: '#3B81F6', // Blaue Hintergrundfarbe für den Button
          border: 'none',
          padding: '10px 20px',
          cursor: 'pointer',
          borderRadius: '5px', // Abgerundete Ecken
        }}
      >
        ➔  Hier zur eigenen KI!
      </button>
    </span>
  );
};
