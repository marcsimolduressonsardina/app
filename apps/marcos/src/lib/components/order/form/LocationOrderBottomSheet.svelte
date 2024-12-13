<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { ButtonAction, ButtonStyle, ButtonText } from '$lib/components/button/button.enum';
	import Button from '$lib/components/button/Button.svelte';
	import { IconType } from '$lib/components/icon/icon.enum';
	import { locationOrderSchema, type LocationOrderSchema } from '$lib/shared/order.utilities';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { Order } from '@marcsimolduressonsardina/core/type';
	import BottomSheet from '$lib/components/BottomSheet.svelte';

	interface Props {
		data: SuperValidated<Infer<LocationOrderSchema>>;
		locations: string[];
		order: Order;
	}

	let { data, locations, order }: Props = $props();
	const form = superForm(data, {
		validators: zodClient(locationOrderSchema),
		id: 'location-order-form'
	});

	const { form: formData, enhance, submitting, errors } = form;
	let formLoading = $state(false);

	$effect(() => {
		if ($submitting) {
			formLoading = true;
		}

		if ($errors.location) {
			formLoading = false;
		}
	});
</script>

{#snippet sheetTrigger()}
	<Button
		text="Ubicación: {order.location.length === 0 ? 'Sin ubicación' : order.location}"
		icon={IconType.LOCATION}
		action={ButtonAction.TRIGGER}
	></Button>
{/snippet}

{#snippet sheetAction()}
	<form method="post" use:enhance action="?/saveLocation" class="flex flex-col gap-2">
		<Form.Field {form} name="location">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Nueva ubicación:</Form.Label>
					<Select.Root type="single" bind:value={$formData.location} name={props.name}>
						<Select.Trigger {...props}
							>{$formData.location
								? $formData.location
								: 'Seleccione una ubicación'}</Select.Trigger
						>
						<Select.Content>
							{#each locations as l}
								<Select.Item value={l}>{l}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Button text="Guardar ubicación" icon={IconType.EDIT} action={ButtonAction.SUBMIT}></Button>
	</form>
{/snippet}

<BottomSheet
	title="Cambiar ubicación"
	description="Seleccione donde se ha dejado el pedido después de finalizarse"
	trigger={sheetTrigger}
	action={sheetAction}
	iconType={IconType.LOCATION}
	loading={formLoading}
	triggerStyle={ButtonStyle.NEUTRAL_VARIANT}
	triggerTextType={ButtonText.NO_COLOR}
></BottomSheet>
