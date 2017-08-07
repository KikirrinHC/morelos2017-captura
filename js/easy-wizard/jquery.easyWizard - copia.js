/* ========================================================
 * easyWizard v1
 * http://st3ph.github.com/jquery.easyWizard
 * ========================================================
 * Copyright 2012 Stéphane Litou
 *
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 * ======================================================== */
(function( $ ) {
	var arrSettings = new Array();
	var easyWizardMethods = {
		init : function(options) {
			var settings = $.extend( {
				'stepClassName' : 'step',
				'showSteps' : true,
				'stepsText' : '{n}. {t}',
				'showButtons' : true,
				'buttonsClass' : '',
				'prevButton' : '< Anterior',
				'nextButton' : 'Siguiente >',
				'debug' : false,
				'submitButton': true,
				'submitButtonText': 'Guardar',
				'submitButtonClass': '',
				before: function(wizardObj, currentStepObj, nextStepObj) {},
				after: function(wizardObj, prevStepObj, currentStepObj) {},
				beforeSubmit: function(wizardObj) {
					wizardObj.find('input, textarea').each(function() {
						if(!this.checkValidity()) {
							this.focus();
							step = $(this).parents('.'+thisSettings.stepClassName).attr('data-step');
							easyWizardMethods.goToStep.call(wizardObj, step);

							return false;
						}
					});
				}
			}, options);

			arrSettings[this.index()] = settings;

			return this.each(function() {
				thisSettings = settings;

				$this = $(this); // Wizard Obj
				$this.addClass('easyWizardElement');
				$steps = $this.find('.'+thisSettings.stepClassName);
				thisSettings.steps = $steps.length;
				thisSettings.width = $(this).width();

				if(thisSettings.steps > 1) {
					// Create UI
					$this.wrapInner('<div class="easyWizardWrapper" />');
					$this.find('.easyWizardWrapper').width(thisSettings.width * thisSettings.steps);
					$this.css({
						'position': 'relative',
						'overflow': 'hidden'
					}).addClass('easyPager');

					$stepsHtml = $('<ul class="easyWizardSteps">');

					$steps.each(function(index) {
						step = index + 1;
						$(this).css({
							'float': 'left',
							'width': thisSettings.width,
							'height': '1px'
						}).attr('data-step', step);

						if(!index) {
							$(this).addClass('active').css('height', '');
						}

						stepText = thisSettings.stepsText.replace('{n}', '<span>'+step+'</span>');
						stepText = stepText.replace('{t}', $(this).attr('data-step-title'));
						$stepsHtml.append('<li'+(!index?' class="current"':'')+' data-step="'+step+'">'+stepText+'</li>');
					});

					if(thisSettings.showSteps) {
						$this.prepend($stepsHtml);
					}

					if(thisSettings.showButtons) {
						paginationHtml = '<div class="easyWizardButtons">';
							paginationHtml += '<button class="prev '+thisSettings.buttonsClass+'">'+thisSettings.prevButton+'</button>';
							paginationHtml += '<button class="next '+thisSettings.buttonsClass+'">'+thisSettings.nextButton+'</button>';
							paginationHtml += thisSettings.submitButton?'<button type="submit" class="submit '+thisSettings.submitButtonClass+'">'+thisSettings.submitButtonText+'</button>':'';
						paginationHtml	+= '</div>';
						$paginationBloc = $(paginationHtml);
						$paginationBloc.css('clear', 'both');
						$paginationBloc.find('.prev, .submit').hide();
						$paginationBloc.find('.prev').bind('click.easyWizard', function(e) {
							e.preventDefault();

							$wizard = $(this).parents('.easyWizardElement');
							easyWizardMethods.prevStep.apply($wizard);
						});

						$paginationBloc.find('.next').bind('click.easyWizard', function(e) {
							e.preventDefault();

							$wizard = $(this).parents('.easyWizardElement');
							easyWizardMethods.nextStep.apply($wizard);
						});
						$this.append($paginationBloc);
					}

					$formObj = $this.is('form')?$this:$(this).find('form');

					// beforeSubmit Callback
					$this.find('[type="submit"]').bind('click.easyWizard', function(e) {
						$wizard = $(this).parents('.easyWizardElement');
						thisSettings.beforeSubmit($wizard);
						return true;
					});
				}else if(thisSettings.debug) {
					console.log('Can\'t make a wizard with only one step oO');
				}
			});
		},
		prevStep : function( ) {
			thisSettings = arrSettings[this.index()];
			$activeStep = this.find('.active');
			if($activeStep.prev('.'+thisSettings.stepClassName).length) {
				prevStep = parseInt($activeStep.attr('data-step')) - 1;
				easyWizardMethods.goToStep.call(this, prevStep);
			}
		},
		
		nextStep : function( ) {
			
			thisSettings = arrSettings[this.index()];
			$activeStep = this.find('.active');
			var pasoactivo=$activeStep.attr('data-step')
			var puedeseguir=false;
			//alert("this="+pasoactivo);
			if(pasoactivo==1){
				if ($("input[name='morelenseEncuestado']:checked").val() == "" || $("input[name='morelenseEncuestado']:checked").val() == undefined) {
					//alert("q1");
					navigator.notification.alert('Debe responder si radica en Morelos o es morelense', "", 'Validación', 'OK');
					$('#morelenseEncuestado1').focus();
				}else if ($("input[name='noticias']:checked").val() == "" || $("input[name='noticias']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 1', "", 'Validación', 'OK');
					$('#noticias1').focus();
				} else if ($("input[name='noticias']:checked").val() != "N.S. - N.C." && ($("#noticiasCual").val() == undefined || $("#noticiasCual").val() == "")) {
                    navigator.notification.alert('Debe especificar el medio de comunicación que utiliza', "", 'Validación', 'OK');
					$('#noticiasCual').focus();
				}else if ($("input[name='libertadeleccion']:checked").val() == "" || $("input[name='libertadeleccion']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 2', "", 'Validación', 'OK');
					$('#libertadeleccion1').focus();
				}else if ($("input[name='familia']:checked").val() == "" || $("input[name='familia']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 3', "", 'Validación', 'OK');
					$('#familia1').focus();
				}else if ($("input[name='futbol']:checked").val() == "" || $("input[name='futbol']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 4', "", 'Validación', 'OK');
					$('#futbol1').focus();
				}else if ($("input[name='orgullomorelense']:checked").val() == "" || $("input[name='orgullomorelense']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 5', "", 'Validación', 'OK');
					$('#orgullomorelense1').focus();
				}else if ($("input[name='identidadmorelense']:checked").val() == "" || $("input[name='identidadmorelense']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 6', "", 'Validación', 'OK');
					$('#identidadmorelense1').focus();
				
				}else{
					puedeseguir=true;
				}
			}else if(pasoactivo==2){
				if ($("input[name='evaluaciongobierno']:checked").val() == "" || $("input[name='evaluaciongobierno']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 7', "", 'Validación', 'OK');
					$('#evaluaciongobierno1').focus();
				}else if ($("input[name='opiniongobernador']:checked").val() == "" || $("input[name='opiniongobernador']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 8', "", 'Validación', 'OK');
					$('#opiniongobernador1').focus();
				} else if ($('#confianzagobernador').val()="") {
                    navigator.notification.alert('Debe responder a la pregunta 9', "", 'Validación', 'OK');
					$('#confianzagobernador').focus();
				}else if ($("input[name='satisfacciongraco']:checked").val() == "" || $("input[name='satisfacciongraco']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 10', "", 'Validación', 'OK');
					$('#satisfacciongraco1').focus();
				}else if ($("input[name='caracteristicasp']:checked").val() == "" || $("input[name='caracteristicasp']:checked").val() == undefined) {
					navigator.notification.alert('Debe elegir una característica positiva', "", 'Validación', 'OK');
					$('#caracteristicasp1').focus();
				}else if ($("input[name='caracteristicasn']:checked").val() == "" || $("input[name='caracteristicasn']:checked").val() == undefined) {
					navigator.notification.alert('Debe elegir una característica negativa', "", 'Validación', 'OK');
					$('#caracteristicasn1').focus();
				}else if ($("input[name='capacidad']:checked").val() == "" || $("input[name='capacidad']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 12', "", 'Validación', 'OK');
					$('#capacidad1').focus();
				}else if ($("input[name='votocuauhtemoc']:checked").val() == "" || $("input[name='votocuauhtemoc']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 13', "", 'Validación', 'OK');
					$('#votocuauhtemoc1').focus();
				}else{
					puedeseguir=true;
				}
			
			}else if(pasoactivo==3){
				if ($("input[name='matrimonios']:checked").val() == "" || $("input[name='matrimonios']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 14', "", 'Validación', 'OK');
					$('#matrimonios1').focus();
				}else if ($("input[name='sociedadmorelense']:checked").val() == "" || $("input[name='sociedadmorelense']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 15', "", 'Validación', 'OK');
					$('#sociedadmorelense1').focus();
				}else if ($("input[name='marihuana']:checked").val() == "" || $("input[name='marihuana']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 16', "", 'Validación', 'OK');
					$('#marihuana1').focus();
				} else if ($('#confianzaobispo').val()="") {
                    navigator.notification.alert('Debe responder a la pregunta 17', "", 'Validación', 'OK');
					$('#confianzaobispo').focus();
				
				}else if ($("input[name='problemacomunidad']:checked").val() == "" || $("input[name='problemacomunidad']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 18', "", 'Validación', 'OK');
					$('#problemacomunidad1').focus();
				}else{
					puedeseguir=true;
				}
			
			}else if(pasoactivo==4){
				
				if ($("input[name='partidorepresenta']:checked").val() == "" || $("input[name='partidorepresenta']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 19', "", 'Validación', 'OK');
					$('#partidorepresentaPAN').focus();
				}else if ($("input[name='partidonovotaria']:checked").val() == "" || $("input[name='partidonovotaria']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 20', "", 'Validación', 'OK');
					$('#partidonovotariaPAN').focus();
				}else if ($("input[name='caracteristicaspri']:checked").val() == "" || $("input[name='caracteristicaspri']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 21', "", 'Validación', 'OK');
					$('#caracteristicaspri1').focus();
				}else if ($("input[name='caracteristicaspan']:checked").val() == "" || $("input[name='caracteristicaspan']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 22', "", 'Validación', 'OK');
					$('#caracteristicaspan1').focus();
				}else if ($("input[name='caracteristicasprd']:checked").val() == "" || $("input[name='caracteristicasprd']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 23', "", 'Validación', 'OK');
					$('#caracteristicasprd1').focus();
				}else if ($("input[name='caracteristicasverde']:checked").val() == "" || $("input[name='caracteristicasverde']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 24', "", 'Validación', 'OK');
					$('#caracteristicasverde1').focus();
				}else if ($("input[name='caracteristicasmorena']:checked").val() == "" || $("input[name='caracteristicasmorena']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 25', "", 'Validación', 'OK');
					$('#caracteristicasmorena1').focus();
				}else if ($("input[name='caracteristicasmovimiento']:checked").val() == "" || $("input[name='caracteristicasmovimiento']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 26', "", 'Validación', 'OK');
					$('#caracteristicasmovimiento1').focus();
				}else if ($("input[name='caracteristicaspes']:checked").val() == "" || $("input[name='caracteristicaspes']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 27', "", 'Validación', 'OK');
					$('#caracteristicaspes1').focus();
				}else{
					puedeseguir=true;
				}
			
			}else if(pasoactivo==5){
				
				if ($("input[name='sentirpan']:checked").val() == "" || $("input[name='sentirpan']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 28', "", 'Validación', 'OK');
					$('#sentirpan1').focus();
				}else if ($("input[name='sentirpri']:checked").val() == "" || $("input[name='sentirpri']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 29', "", 'Validación', 'OK');
					$('#sentirpri1').focus();
				}else if ($("input[name='sentirprd']:checked").val() == "" || $("input[name='sentirprd']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 30', "", 'Validación', 'OK');
					$('#sentirprd1').focus();
				}else if ($("input[name='sentirverde']:checked").val() == "" || $("input[name='sentirverde']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 31', "", 'Validación', 'OK');
					$('#sentirverde1').focus();
				}else if ($("input[name='sentirmorena']:checked").val() == "" || $("input[name='sentirmorena']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 32', "", 'Validación', 'OK');
					$('#sentirmorena1').focus();
				}else if ($("input[name='sentirmovimiento']:checked").val() == "" || $("input[name='sentirmovimiento']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 33', "", 'Validación', 'OK');
					$('#sentirmovimiento1').focus();
				}else if ($("input[name='sentirpes']:checked").val() == "" || $("input[name='sentirpes']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 34', "", 'Validación', 'OK');
					$('#sentirpes1').focus();
				}else if ($("input[name='partidohonesto']:checked").val() == "" || $("input[name='partidohonesto']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 35', "", 'Validación', 'OK');
					$('#partidohonestoPAN').focus();
				}else if ($("input[name='partidodeshonesto']:checked").val() == "" || $("input[name='partidodeshonesto']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 36', "", 'Validación', 'OK');
					$('#partidodeshonestoPAN').focus();
				}else if ($("input[name='partidomenteabierta']:checked").val() == "" || $("input[name='partidomenteabierta']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 37', "", 'Validación', 'OK');
					$('#partidomenteabiertaPAN').focus();
				}else if ($("input[name='partidomentecerrada']:checked").val() == "" || $("input[name='partidomentecerrada']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 38', "", 'Validación', 'OK');
					$('#partidomentecerradaPAN').focus();
				}else if ($("input[name='partidotrabajador']:checked").val() == "" || $("input[name='partidotrabajador']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 39', "", 'Validación', 'OK');
					$('#partidotrabajadorPAN').focus();
				}else if ($("input[name='partidoflojo']:checked").val() == "" || $("input[name='partidoflojo']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 40', "", 'Validación', 'OK');
					$('#partidoflojoPAN').focus();
				}else if ($("input[name='partidointeligente']:checked").val() == "" || $("input[name='partidointeligente']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 41', "", 'Validación', 'OK');
					$('#partidointeligentePAN').focus();
				}else if ($("input[name='partidoignorante']:checked").val() == "" || $("input[name='partidoignorante']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 42', "", 'Validación', 'OK');
					$('#partidoignorantePAN').focus();
				}else if ($("input[name='partidoutil']:checked").val() == "" || $("input[name='partidoutil']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 43', "", 'Validación', 'OK');
					$('#partidoutilPAN').focus();
				}else if ($("input[name='partidoinutil']:checked").val() == "" || $("input[name='partidoinutil']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 44', "", 'Validación', 'OK');
					$('#partidoinutilPAN').focus();
				}else if ($("input[name='partidopreparado']:checked").val() == "" || $("input[name='partidopreparado']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 45', "", 'Validación', 'OK');
					$('#partidopreparadoPAN').focus();
				}else if ($("input[name='partidomejoresresultados']:checked").val() == "" || $("input[name='partidomejoresresultados']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 46', "", 'Validación', 'OK');
					$('#partidomejoresresultadosPAN').focus();
				}else if ($("input[name='alianzasfuncionan']:checked").val() == "" || $("input[name='alianzasfuncionan']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 47', "", 'Validación', 'OK');
					$('#alianzasfuncionan1').focus();
				}else if ($("input[name='alianzapreferencia']:checked").val() == "" || $("input[name='alianzapreferencia']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 48', "", 'Validación', 'OK');
					$('#alianzapreferencia1').focus();
				
				}else{
					puedeseguir=true;
				}
			
			}else if(pasoactivo==6){
				
				if ($("input[name='reconoce']:checked").val() == "" || $("input[name='reconoce']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49', "", 'Validación', 'OK');
					$('#reconoceAVJ').focus();
				}else if ($("input[name='opinionAVJ']:checked").val() == "" || $("input[name='opinionAVJ']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBAVJ').focus();
				}else if ($("input[name='opinionJBA']:checked").val() == "" || $("input[name='opinionJBA']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBJBA').focus();
				}else if ($("input[name='opinionMQM']:checked").val() == "" || $("input[name='opinionMQM']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBMQM').focus();
				}else if ($("input[name='opinionRSS']:checked").val() == "" || $("input[name='opinionRSS']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBRSS').focus();
				}else if ($("input[name='opinionMMG']:checked").val() == "" || $("input[name='opinionMMG']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBMMG').focus();
				}else if ($("input[name='opinionJAC']:checked").val() == "" || $("input[name='opinionJAC']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBJAC').focus();
				}else if ($("input[name='opinionMVS']:checked").val() == "" || $("input[name='opinionMVS']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBMVS').focus();
				}else if ($("input[name='opinionCBB']:checked").val() == "" || $("input[name='opinionCBB']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBCBB').focus();
				}else if ($("input[name='opinionRGC']:checked").val() == "" || $("input[name='opinionRGC']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBRGC').focus();
				}else if ($("input[name='opinionLMG']:checked").val() == "" || $("input[name='opinionLMG']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 49.1', "", 'Validación', 'OK');
					$('#personajeBLMG').focus();
				}else{
					puedeseguir=true;
				}
			
			}else if(pasoactivo==7){
				var victima = 0;
                                    $('#victimaGroup .btn.active').each(function() {

                                        victima = victima + 1;
                                    });
                                    if ($('#delitootro').val() != "") {
                                        victima = victima + 1;
                                    }
				if ($("input[name='inseguridad']:checked").val() == "" || $("input[name='inseguridad']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 50', "", 'Validación', 'OK');
					$('#inseguridad1').focus();
				}else if ($("input[name='victima']:checked").val() == "" || $("input[name='victima']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 51', "", 'Validación', 'OK');
					$('#victima1').focus();
					
				} else if ($("button[name='victima'].active").val() == "Si" && (victima == 0)) {
                    navigator.notification.alert('Debe indicar el delito', "", 'Validación', 'OK');
					$('#victimaSi1').focus();
                } else if (($("button[name='victima'].active").val() == "Si" && (victima > 0)) && ($("button[name='generovictima'].active").val() == "" || $("button[name='generovictima'].active").val() == undefined)) {
                    navigator.notification.alert('Debe indicar el género de la víctima', "", 'Validación', 'OK');
					$('#generovictima1').focus();
                } else if (($("button[name='victima'].active").val() == "Si" && (victima > 0)) && ($('#edadvictima').val()=="")) {
                    navigator.notification.alert('Debe indicar la edad de la víctima', "", 'Validación', 'OK');
					$('#edadvictima').focus();
                } else if (($("button[name='victima'].active").val() == "Si" && (victima > 0)) && ($('#ocupacionvictima').val()=="")) {
                    navigator.notification.alert('Debe indicar la ocupación de la víctima', "", 'Validación', 'OK');
					$('#ocupacionvictima').focus();
                } else if (($("button[name='victima'].active").val() == "Si" && (victima > 0)) && ($("button[name='denuncia'].active").val() == "" || $("button[name='generovictima'].active").val() == undefined)) {
                    navigator.notification.alert('Debe indicar si denunció el hecho', "", 'Validación', 'OK');
					$('#denuncia1').focus();
                                              
					
					
				}else if ($("input[name='socavon']:checked").val() == "" || $("input[name='socavon']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta 53', "", 'Validación', 'OK');
					$('#socavon1').focus();
				}else{
					puedeseguir=true;
				}
			
			}else if(pasoactivo==8){
				
				if ($("input[name='']:checked").val() == "" || $("input[name='']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta ', "", 'Validación', 'OK');
					$('#1').focus();
				}else if ($("input[name='']:checked").val() == "" || $("input[name='']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta ', "", 'Validación', 'OK');
					$('#1').focus();
				}else if ($("input[name='']:checked").val() == "" || $("input[name='']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta ', "", 'Validación', 'OK');
					$('#1').focus();
				}else if ($("input[name='']:checked").val() == "" || $("input[name='']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta ', "", 'Validación', 'OK');
					$('#1').focus();
				}else if ($("input[name='']:checked").val() == "" || $("input[name='']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta ', "", 'Validación', 'OK');
					$('#1').focus();
				}else if ($("input[name='']:checked").val() == "" || $("input[name='']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta ', "", 'Validación', 'OK');
					$('#1').focus();
				}else if ($("input[name='']:checked").val() == "" || $("input[name='']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta ', "", 'Validación', 'OK');
					$('#1').focus();
				}else if ($("input[name='']:checked").val() == "" || $("input[name='']:checked").val() == undefined) {
					navigator.notification.alert('Debe responder a la pregunta ', "", 'Validación', 'OK');
					$('#1').focus();
				}else{
					puedeseguir=true;
				}
			
			}
			
			
			
			if(puedeseguir){
				if($activeStep.next('.'+thisSettings.stepClassName).length) {
						nextStep = parseInt($activeStep.attr('data-step')) + 1;
						easyWizardMethods.goToStep.call(this, nextStep);
						var body = $("html, body");
						body.stop().animate({scrollTop:0}, 900, 'swing', function() { 
						   //alert("Finished animating");
						});
					}
			}
		},
		/*
		nextStep : function( ) {
			thisSettings = arrSettings[this.index()];
			$activeStep = this.find('.active');
			if($activeStep.next('.'+thisSettings.stepClassName).length) {
				nextStep = parseInt($activeStep.attr('data-step')) + 1;
				easyWizardMethods.goToStep.call(this, nextStep);
				var body = $("html, body");
				body.stop().animate({scrollTop:0}, 900, 'swing', function() { 
				   //alert("Finished animating");
				});
			}
		},
		*/
		goToStep : function(step) {
			thisSettings = arrSettings[this.index()];

			$activeStep = this.find('.active');
			$nextStep = this.find('.'+thisSettings.stepClassName+'[data-step="'+step+'"]');
			currentStep = $activeStep.attr('data-step');

			// Before callBack
			thisSettings.before(this, $activeStep, $nextStep);

			// Define direction for sliding
			if(currentStep < step) { // forward
				leftValue = thisSettings.width * -1;
			}else { // backward
				leftValue = thisSettings.width;
			}

			// Slide !
			$activeStep.animate({
				height: '1px'
			}).removeClass('active');

			$nextStep.css('height', '').addClass('active');

			this.find('.easyWizardWrapper').animate({
				'margin-left': thisSettings.width * (step - 1) * -1
			});

			// Defines steps
			this.find('.easyWizardSteps .current').removeClass('current');
			this.find('.easyWizardSteps li[data-step="'+step+'"]').addClass('current');

			// Define buttons
			$paginationBloc = this.find('.easyWizardButtons');
			if($paginationBloc.length) {
				if(step == 1) {
					$paginationBloc.find('.prev, .submit').hide();
					$paginationBloc.find('.next').show();
				}else if(step < thisSettings.steps) {
					$paginationBloc.find('.submit').hide();
					$paginationBloc.find('.prev, .next').show();
				}else {
					$paginationBloc.find('.next').hide();
					$paginationBloc.find('.submit').show();
				}
			}

			// After callBack
			thisSettings.after(this, $activeStep, $nextStep);
		}
	};

	$.fn.easyWizard = function(method) {
		if ( easyWizardMethods[method] ) {
			return easyWizardMethods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return easyWizardMethods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.easyWizard' );
		}
	};
})(jQuery);
