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
    <a
      ref={liteBadge}
      href={'https://eigene-ki.de'}
      target="_blank"
      rel="noopener noreferrer"
      class="lite-badge"
      id="lite-badge"
      style={{
        display: 'inline-block',
        backgroundColor: props.badgeBackgroundColor ?? '#3B81F6', // Verwende die übergebene Hintergrundfarbe oder fallback auf Blau
        color: props.poweredByTextColor ?? '#ffffff', // Verwende die übergebene Textfarbe oder fallback auf Weiß
        padding: '10px 20px',
        borderRadius: '20px',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '14px',
        boxShadow: '0px 3px 6px rgba(0,0,0,0.16)',
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      ➔ Hier zur eigenen KI!
    </a>
  );
};
